import * as Serialisation from "../serialisable"
import { Entity } from "./entity"
import { flatbuffers } from "flatbuffers";
import { showtime } from "../schemas/graph_types_generated"

export class Factory extends Entity implements Serialisation.Serialisable<showtime.Factory>{
    creatables: URL[];

    constructor(input: string="", output: string=""){
        super(name, showtime.EntityTypes.Factory);
        this.creatables = new Array<URL>();
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        let entity_offset = this.serialize_entityData(builder);
        let factory_offset =  this.serialize_factoryData(builder);
        return showtime.Factory.createFactory(builder,  entity_offset, factory_offset);
    }

    public serialize_factoryData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        let str_offsets = new Array<flatbuffers.Offset>(this.creatables.length);
        this.creatables.forEach((element, index) => { str_offsets[index] = builder.createString(element.pathname); });
        return showtime.FactoryData.createFactoryData(builder, showtime.FactoryData.createCreatablesVector(builder, str_offsets));
    }

    public deserialize(buffer: showtime.Factory): Factory {
        this.deserialize_entityData(buffer.entity());
        this.deserialize_factoryData(buffer.factory());
        return this;
    }

    public deserialize_factoryData(buffer: showtime.FactoryData|null): void {
        if(!buffer) return;

        this.creatables.length = buffer.creatablesLength();
        for(let index = 0; index < buffer.creatablesLength(); ++index){
            this.creatables[index] = new URL(buffer.creatables(index), "zst://");
        }
    }
}
