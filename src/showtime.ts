import { WebsocketTransport } from "ws_transport"

export const greet = () => {return 'Hello, world!'}

class Client {
	private _ws_transport:WebsocketTransport;

	constructor(address:string){
		this._ws_transport = new WebsocketTransport(address, 80);
	}
}