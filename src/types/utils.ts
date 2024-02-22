import type { SchemaTimestampsConfig } from "mongoose";

export type MongooseSchema<T> = SchemaTimestampsConfig & T & {
    _id: string;
};
