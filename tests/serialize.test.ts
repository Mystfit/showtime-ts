import { Entity } from "../src/entities/entity"
import { Factory } from "../src/entities/factory"
import { Component } from "../src/entities/component"
import { Performer } from "../src/entities/performer"
import { Plug } from "../src/entities/plug"
import { Cable } from "../src/cable"

import { showtime } from '../src/schemas/graph_types_generated'
import { flatbuffers } from "flatbuffers"

describe('Can serialize entity type', () => {
    it('is an Entity', async () => {
        const entity = new Entity("test_entity");
        entity.owner = new URL("test_owner", "zst://");
        let builder = new flatbuffers.Builder();
        builder.finish(entity.serialize(builder));
        expect(new Entity().deserialize(showtime.Entity.getRootAsEntity(builder.dataBuffer()))).toEqual(entity);
    });

    it('is a Component', async () => {
        const component = new Component("component");
        let builder = new flatbuffers.Builder();
        builder.finish(component.serialize(builder));
        expect(new Component().deserialize(showtime.Component.getRootAsComponent(builder.dataBuffer()))).toEqual(component);
    });

    it('is a Performer', async () => {
        const performer = new Performer("test_performer");
        let builder = new flatbuffers.Builder();
        builder.finish(performer.serialize(builder));
        expect(new Performer().deserialize(showtime.Performer.getRootAsPerformer(builder.dataBuffer()))).toEqual(performer);
    });

    it('is a Factory', async () => {
        const factory = new Factory("factory");
        let builder = new flatbuffers.Builder();
        builder.finish(factory.serialize(builder));
        expect(new Factory().deserialize(showtime.Factory.getRootAsFactory(builder.dataBuffer()))).toEqual(factory);
    });

    it('is a Cable', async () => {
        const cable = new Cable("a", "b");
        let builder = new flatbuffers.Builder();
        builder.finish(cable.serialize(builder));
        expect(new Cable().deserialize(showtime.Cable.getRootAsCable(builder.dataBuffer()))).toEqual(cable);
    });

    it('is an empty Plug', async () => {
        const plug = new Plug("test_plug");
        let builder = new flatbuffers.Builder();
        builder.finish(plug.serialize(builder));
        expect(new Plug().deserialize(showtime.Plug.getRootAsPlug(builder.dataBuffer()))).toEqual(plug);
    });

    it('is a IntList plug', async () => {
        const plug = new Plug("test_plug", showtime.ValueList.IntList, showtime.PlugDirection.IN_JACK);
        plug.values.values.push(42);
        plug.values.values.push(7);
        let builder = new flatbuffers.Builder();
        builder.finish(plug.serialize(builder));
        
        let deserialized_plug = new Plug().deserialize(showtime.Plug.getRootAsPlug(builder.dataBuffer()));
        expect(deserialized_plug.values.values[0]).toEqual(plug.values.values[0]);
        expect(deserialized_plug.values.values[1]).toEqual(plug.values.values[1]);
    });

    it('is a FloatList plug', async () => {
        const plug = new Plug("test_plug", showtime.ValueList.FloatList, showtime.PlugDirection.IN_JACK);
        plug.values.values.push(42.2);
        plug.values.values.push(7.7);
        let builder = new flatbuffers.Builder();
        builder.finish(plug.serialize(builder));
        
        let deserialized_plug = new Plug().deserialize(showtime.Plug.getRootAsPlug(builder.dataBuffer()));
        expect(deserialized_plug.values.values[0]).toBeCloseTo(plug.values.values[0] as number);
        expect(deserialized_plug.values.values[1]).toBeCloseTo(plug.values.values[1] as number);
    });

    it('is a StrList plug', async () => {
        const plug = new Plug("test_plug", showtime.ValueList.StrList, showtime.PlugDirection.IN_JACK);
        plug.values.values.push("foo");
        plug.values.values.push("bar");
        let builder = new flatbuffers.Builder();
        builder.finish(plug.serialize(builder));
        
        let deserialized_plug = new Plug().deserialize(showtime.Plug.getRootAsPlug(builder.dataBuffer()));
        expect(deserialized_plug.values.values[0]).toEqual(plug.values.values[0]);
        expect(deserialized_plug.values.values[1]).toEqual(plug.values.values[1]);
    });
});
