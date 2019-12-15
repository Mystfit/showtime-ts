// test.js
import { Client } from '../src/showtime';
import {Entity} from "../src/entity"
//import { Entity } from '../dist/entity';

import { showtime } from '../src/schemas/graph_types_generated'
import {flatbuffers} from "flatbuffers"
import WS from "jest-websocket-mock";

describe('Client', () => {
  it('connects to the server', async () => {
    const address = "localhost";
    const port = 80;
    const server = new WS("ws://" + address + ":" + port, { jsonProtocol: true });
    const client = new Client(address, port);
    await server.connected;

    client.join("localhost", port);

    var expected_response = {"kind": "CLIENT_JOIN", "msg_ID": 1, "payload": {}}
    await expect(server).toReceiveMessage(expected_response);
    expect(server).toHaveReceivedMessages([
        expected_response,
    ]);
  });
});

describe('Entity', () => {
  it('can serialize', async () => {
    const entity = new Entity("test_parent/test_entity");
    entity.owner = new URL("test_owner", "zst://");

    console.log(entity.URI);

    let builder = new flatbuffers.Builder();
    let entity_offset = entity.serialize(builder);
    builder.finish(entity_offset);
    
    let deserialized_entity = Entity.deserialize(showtime.Entity.getRootAsEntity(builder.dataBuffer()));
    expect(deserialized_entity.URI).toBe(entity.URI);
    expect(deserialized_entity.owner).toBe(entity.owner);
  });
});