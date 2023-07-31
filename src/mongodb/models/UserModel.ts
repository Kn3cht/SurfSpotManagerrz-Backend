import {model, Model, Schema} from "mongoose";
import {User} from "../../__generated__/resolvers-types";
import { v4 as uuid } from 'uuid'

export interface DBUser extends User {
    password: string;
}

export const UserSchema = new Schema<DBUser>({
    _id: { type: String, required: true, unique: true, default: () => uuid() },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, select: false, required: true },
})

export const UserModel = model<DBUser>("User", UserSchema);