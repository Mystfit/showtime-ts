import { Entity } from "./entity"
import { Value } from "./value"

import * as Serialisation from "../serialisable"
import { flatbuffers } from "flatbuffers";
import { showtime } from "../schemas/graph_types_generated"

export class Plug extends Entity implements Serialisation.Serialisable<showtime.Plug>{
    public direction: showtime.PlugDirection;
    public max_cables: number;
    public values: Value;

    constructor(name: string="", value_type:showtime.ValueList=showtime.ValueList.NONE, direction=showtime.PlugDirection.NONE, max_cables:number=-1){
        super(name, showtime.EntityTypes.Plug);
        this.direction = direction;
        this.max_cables = max_cables;
        this.values = new Value(value_type);
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        let entity_offset = this.serialize_entityData(builder);
        let plug_offset = this.serialize_plugData(builder);
        return showtime.Plug.createPlug(builder, entity_offset, plug_offset);
    }

    public serialize_plugData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        let value_offset = this.values.serialize_plugValueData(builder);
        return showtime.PlugData.createPlugData(builder, this.direction, this.max_cables, value_offset);
    }

    public deserialize(buffer: showtime.Plug): Plug {
        this.deserialize_entityData(buffer.entity());
        this.deserialize_plugData(buffer.plug());
        return this;
    }

    public deserialize_plugData(buffer: showtime.PlugData|null): void {
        if(!buffer) return;
        this.direction = buffer.plugDirection();
        this.max_cables = buffer.maxCables();

        if(buffer.value()){
            this.values = new Value().deserialize(buffer.value()!);
        }
    }
}
