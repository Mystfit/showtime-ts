import { Message } from "message"

export class WebsocketTransport {
    private _ws: WebSocket; 

    constructor(address: string, port: number){
        this._ws = new WebSocket(`ws://${address}:${port}`);
        this._ws.onopen = this.onOpen;
        this._ws.onclose = this.onClose;
        this._ws.onmessage = this.onMessage;
        this._ws.onerror = this.onError;
    }

    get ws() {
        return this._ws;
    };

    onOpen(ev: Event): void {
        console.log("CONNECTED");
    }

    onClose(ev: CloseEvent): void {
         console.log("DISCONNECTED");
    }

    onMessage(ev: MessageEvent): void {
        console.log(ev.data);
    }

    onError(ev: Event): void {
        console.log("ERROR");
    }
}