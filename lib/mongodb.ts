// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (uri == null) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // @ts-expect-error this works fine
  if (global._mongoClientPromise != null) {
    // @ts-expect-error this works fine
    client = new MongoClient(uri, options);
    // @ts-expect-error this works fine
    global._mongoClientPromise = client.connect();
  }
  // @ts-expect-error this works fine
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  // @ts-expect-error this works fine
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
