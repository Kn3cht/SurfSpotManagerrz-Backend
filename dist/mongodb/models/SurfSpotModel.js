import { model, Schema } from "mongoose";
import { v4 as uuid } from "uuid";
var CoordinateSchema = new Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
});
var LocationSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: CoordinateSchema,
});
var SurfSpotSchema = new Schema({
    _id: { type: String, required: true, unique: true, default: function () { return uuid(); } },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    location: LocationSchema,
    description: { type: String, required: true },
    rating: { type: Number, required: false, max: 5, min: 0 },
});
export var SurfSpotModel = model("SurfSpot", SurfSpotSchema);
