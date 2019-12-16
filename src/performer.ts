import * as Serialisation from "./serialisable"
import { Component } from "./component"
import { Entity } from "./entity"
import { flatbuffers } from "flatbuffers";
import { showtime } from "./schemas/graph_types_generated"

export class Performer extends Component implements Serialisation.Serialisable<showtime.Performer>{
    constructor(name: string=""){
        super("", name, showtime.EntityTypes.Performer);
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        let entity_offset = this.serialize_entityData(builder);
        let component_offset = this.serialize_componentData(builder);
        let performer_offset = this.serialize_performerData(builder);
        return showtime.Performer.createPerformer(builder, entity_offset, component_offset, performer_offset);
    }

    public serialize_performerData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        return showtime.PerformerData.createPerformerData(builder);
    }

    public deserialize(buffer: showtime.Performer): Performer {
        this.deserialize_entityData(buffer.entity());
        this.deserialize_componentData(buffer.component());
        this.deserialize_performerData(buffer.performer());
        return this;
    }

    public deserialize_performerData(buffer: showtime.PerformerData|null): void {
        if(!buffer) return;
    }
}
