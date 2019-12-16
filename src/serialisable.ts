import { flatbuffers } from "flatbuffers"

export interface Serialisable<Buffer_T> {
	serialize(builder: flatbuffers.Builder): flatbuffers.Offset;
	deserialize(buffer: Buffer_T|undefined) : void;
}
