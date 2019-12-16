import { Entity } from "../src/entity"
import { Component } from "../src/component"
import { Performer } from "../src/performer"
import { showtime } from '../src/schemas/graph_types_generated'
import { flatbuffers } from "flatbuffers"

describe('Can serialize entity type', () => {
    it('is an Entity', async () => {
        const entity = new Entity("test_entity");
        entity.owner = new URL("test_owner", "zst://");

        let builder = new flatbuffers.Builder();
        let entity_offset = entity.serialize(builder);
        builder.finish(entity_offset);
        
        let deserialized_entity = new Entity().deserialize(showtime.Entity.getRootAsEntity(builder.dataBuffer()));
        expect(deserialized_entity).toEqual(entity);
    });

    it('is a Component', async () => {
        const component = new Component("component");
        let builder = new flatbuffers.Builder();
        builder.finish(component.serialize(builder));
        
        let deserialized_component = new Component().deserialize(showtime.Component.getRootAsComponent(builder.dataBuffer()));
        expect(deserialized_component).toEqual(component);
    });

    it('is a Performer', async () => {
        const performer = new Performer("test_performer");
        let builder = new flatbuffers.Builder();
        builder.finish(performer.serialize(builder));
        
        let deserialized_performer = new Performer().deserialize(showtime.Performer.getRootAsPerformer(builder.dataBuffer()));
        expect(deserialized_performer).toEqual(performer);
    });
});
