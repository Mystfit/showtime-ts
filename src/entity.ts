// import {staticImplements} from "./serialisable"
import * as Serialisation from "./serialisable"
import { flatbuffers } from "flatbuffers";
import { showtime } from "./schemas/graph_types_generated"

export class Entity implements Serialisation.Serialisable<showtime.Entity> {
    public URI: URL;
    public owner: URL;
    public registered: boolean;
    public entity_type: showtime.EntityTypes;

    constructor(name: string="", type:showtime.EntityTypes=showtime.EntityTypes.NONE){
        this.URI = new URL(name, "zst://");
        this.owner = new URL("", "zst://");
        this.registered = false;
        this.entity_type = showtime.EntityTypes.NONE;
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        return showtime.Entity.createEntity(builder, this.serialize_entityData(builder));
    }

    public serialize_entityData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        return showtime.EntityData.createEntityData(builder, builder.createString(this.URI.toString()), builder.createString(this.owner.toString()));
    }

    public deserialize(buffer: any): Entity {
        this.deserialize_entityData(buffer.entity());
        return this;
    }

    public deserialize_entityData(buffer: showtime.EntityData|null): void {
        if(!buffer) return;
        this.URI = new URL(buffer.URI() ? buffer.URI()! : "");
        this.owner = new URL(buffer.owner() ? buffer.owner()! : "");
    }
}
