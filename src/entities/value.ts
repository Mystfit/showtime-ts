import * as Serialisation from "../serialisable"
import { flatbuffers } from "flatbuffers";
import { showtime } from "../schemas/graph_types_generated"


export class Value implements Serialisation.Serialisable<showtime.PlugValue>{
    
    public value_type: showtime.ValueList;
    public values: Array<number|string>;

    constructor(value_type: showtime.ValueList=showtime.ValueList.NONE){
        this.value_type = value_type;
        
        if(value_type == showtime.ValueList.StrList)
            this.values = new Array<string>();
        else
            this.values = new Array<number>();
    }

    public serialize(builder: flatbuffers.Builder): flatbuffers.Offset {
        return this.serialize_plugValueData(builder);
    }

    public serialize_plugValueData(builder: flatbuffers.Builder) : flatbuffers.Offset {
        if(this.value_type == showtime.ValueList.IntList){
            return showtime.PlugValue.createPlugValue(builder, showtime.ValueList.IntList, showtime.IntList.createIntList(builder, showtime.IntList.createValVector(builder, this.as_int_array())));
        } else if(this.value_type == showtime.ValueList.FloatList){
            return showtime.PlugValue.createPlugValue(builder, showtime.ValueList.FloatList, showtime.FloatList.createFloatList(builder, showtime.FloatList.createValVector(builder, this.as_float_array())));
        } else if(this.value_type == showtime.ValueList.StrList){
            let str_arr = this.as_str_array();
            let str_offsets = new Array<flatbuffers.Offset>(str_arr.length);
            str_arr.forEach((element, index) => { str_offsets[index] = builder.createString(element); });
            return showtime.PlugValue.createPlugValue(builder, showtime.ValueList.StrList, showtime.StrList.createStrList(builder, showtime.StrList.createValVector(builder, str_offsets)));
        }
        return showtime.PlugValue.createPlugValue(builder, this.value_type, showtime.StrList.createValVector(builder, []));
    }

    public deserialize(buffer: showtime.PlugValue): Value {
        this.deserialize_plugValueData(buffer);
        return this;
    }

    public deserialize_plugValueData(buffer: showtime.PlugValue|null): void {
        if(!buffer) return;
        this.value_type = buffer.valuesType();

        let values: Int32Array|Float32Array|string[]|null;
        if(buffer.valuesType() == showtime.ValueList.IntList){
            values = buffer.values<showtime.IntList>(new showtime.IntList())!.valArray();
        } else if(buffer.valuesType() == showtime.ValueList.FloatList){
            values = buffer.values<showtime.FloatList>(new showtime.FloatList())!.valArray();
        } else if(buffer.valuesType() == showtime.ValueList.StrList){
            let str_list = buffer.values<showtime.StrList>(new showtime.StrList());
            if(!str_list) return;
            values = new Array<string>(str_list!.valLength());
            for(let index = 0; index < str_list!.valLength(); ++index){
                values[index] = str_list!.val(index);
            }
        } else {
            values = null;
        }
        if(!values) return;

        this.values.length = values.length;
        for(let index: number = 0; index < values!.length; ++index){
            this.values[index] = (values![index]);
        }
    }

    private as_int_array(): number[] {
        let result = new Array<number>(this.values.length);
        this.values.forEach((element, index) => {
            let val = (element.valueOf() as number);
            result[index] = (val > 0) ? Math.floor(val) : Math.ceil(val);
        });
        return result;
    }

    private as_float_array(): number[] {
        let result = new Array<number>(this.values.length);
        this.values.forEach((element, index) => {
            result[index] = element.valueOf() as number;
        });
        return result;
    }

    private as_str_array(): string[] {
        let result: Array<string> = new Array<string>(this.values.length);
        this.values.forEach((element, index) => {
            result[index] = element.valueOf() as string;
        });
        return result;
    }    
}
