import * as Serialisation from "../serialisable"
import { Entity } from "./entity"
import { flatbuffers } from "flatbuffers";
import { showtime } from "../schemas/graph_types_generated"

export class Component extends Entity implements Serialisation.Serialisable<showtime.Component>{
    public component_type: string;

    constructor(name: string="", type: string="", entity_type:showtime.EntityTypes=showtime.EntityTypes.Component){
        super(name, entity_type);
        this.component_type = type;
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        let entity_offset = this.serialize_entityData(builder);
        let component_offset = this.serialize_componentData(builder);
        return showtime.Component.createComponent(builder, entity_offset, component_offset);
    }

    public serialize_componentData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        return showtime.ComponentData.createComponentData(builder, builder.createString(this.component_type));
    }

    public deserialize(buffer: showtime.Component): Component {
        this.deserialize_entityData(buffer.entity());
        this.deserialize_componentData(buffer.component());
        return this;
    }

    public deserialize_componentData(buffer: showtime.ComponentData|null): void {
        if(!buffer) return;
        this.component_type = buffer.componentType() ? buffer.componentType()! : "";
    }
}
