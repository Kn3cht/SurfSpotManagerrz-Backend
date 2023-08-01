import { model, Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
export var UserSchema = new Schema({
    _id: { type: String, required: true, unique: true, default: function () { return uuid(); } },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, select: false, required: true },
});
export var UserModel = model("User", UserSchema);
