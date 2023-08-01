import { model, Schema } from "mongoose";
import {
  Coordinates,
  Location,
  SurfSpot,
} from "../../__generated__/resolvers-types";
import { v4 as uuid } from "uuid";

const CoordinateSchema = new Schema<Coordinates>({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

const LocationSchema = new Schema<Location>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: CoordinateSchema,
});

const SurfSpotSchema = new Schema<SurfSpot>({
  _id: { type: String, required: true, unique: true, default: () => uuid() },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  location: LocationSchema,
  description: { type: String, required: true },
});

export const SurfSpotModel = model<SurfSpot>("SurfSpot", SurfSpotSchema);
