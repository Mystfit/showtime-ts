export interface Serialisable {
	serialize(builder: flatbuffers.Builder): flatbuffers.Offset;
}
