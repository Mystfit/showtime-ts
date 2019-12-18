import * as Serialisation from "./serialisable"
import { flatbuffers } from "flatbuffers";
import { showtime } from "./schemas/graph_types_generated"

export class Cable implements Serialisation.Serialisable<showtime.Cable>{
    public input: URL;
    public output: URL;

    constructor(input: string="", output: string=""){
        this.input = new URL(input, "zst://");
        this.output = new URL(output, "zst://");
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        return showtime.Cable.createCable(builder, this.serialize_cableData(builder));
    }

    public serialize_cableData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        return showtime.CableData.createCableData(builder, builder.createString(this.input.pathname), builder.createString(this.output.pathname));
    }

    public deserialize(buffer: showtime.Cable): Cable {
        this.deserialize_cableData(buffer.address());
        return this;
    }

    public deserialize_cableData(buffer: showtime.CableData|null): void {
        if(!buffer) return;
        this.input = new URL(buffer.inputURI()!, "zst://");
        this.output = new URL(buffer.outputURI()!, "zst://");
    }
}
