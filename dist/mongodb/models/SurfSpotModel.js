import { model, Schema } from "mongoose";
import { v4 as uuid } from "uuid";
var CoordinateSchema = new Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
});
var SurfSpotSchema = new Schema({
    _id: { type: String, required: true, unique: true, default: function () { return uuid(); } },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    coordinates: CoordinateSchema,
    description: { type: String, required: true },
});
export var SurfSpotModel = model("SurfSpot", SurfSpotSchema);
