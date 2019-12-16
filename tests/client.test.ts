import { Client } from '../src/showtime';
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
