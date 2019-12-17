import { Performer } from "./entities/performer"
import { WebsocketTransport } from "./ws_transport"


export class Client {
	private _ws_transport:WebsocketTransport;

	constructor(address:string, port:number = 80){
		this._ws_transport = new WebsocketTransport(address, port);
	}

	join(address:string, port:number){
		this._ws_transport.ws.send(JSON.stringify({"kind": "CLIENT_JOIN", "msg_ID": 1, "payload": {}}));
	}
}
