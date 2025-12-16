import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI == null) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-expect-error this works fine
let cached = global.mongoose;

if (cached == null) {
  // @ts-expect-error this works fine
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn != null) {
    return cached.conn;
  }

  if (cached.promise == null) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // default ~10s
      socketTimeoutMS: 45000, // default 0 (no timeout)
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
    };
    if (MONGODB_URI != null) {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
