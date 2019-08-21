export class Message {
	kind: string;
	id: number;
	payload: object;

	constructor(kind:string, id:number, payload:object){
		this.kind = kind;
		this.id = id;
		this.payload = payload;
	}
}