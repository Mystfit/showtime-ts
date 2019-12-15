import { Serialisable } from "./serialisable"
import { flatbuffers } from "flatbuffers";
import { showtime } from "./schemas/graph_types_generated"

export class Entity implements Serialisable {
    public URI: URL;
    public owner: URL;
    public registered: boolean;
    public entity_type: showtime.EntityTypes;

    constructor(name: string=""){
        this.URI = new URL(name, "zst://");
        this.owner = new URL("zst://");
        this.registered = false;
        this.entity_type = showtime.EntityTypes.NONE;
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        return showtime.Entity.createEntity(builder, this.serialize_partial(builder));
    }

    public serialize_partial(builder: flatbuffers.Builder) : flatbuffers.Offset {
        return showtime.EntityData.createEntityData(builder, builder.createString(this.URI.toString()), builder.createString(this.owner.toString()));
    }

    public static deserialize(buffer: showtime.Entity): Entity {
        let entity = new Entity();
        entity.deserialize_partial(buffer.entity());
        return entity;
    }

    public deserialize_partial(buffer: showtime.EntityData|null): void {
        if(!buffer)
            return;

        this.URI = new URL(buffer.URI() ? buffer.URI()! : "");
        this.owner = new URL(buffer.owner() ? buffer.owner()! : "");
    }
}
