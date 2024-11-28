// const { MongoClient, ServerApiVersion } = require("mongodb");

// // Replace the placeholder with your Atlas connection string
// const uri = "mongodb://localhost:27017";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const myDB = client.db("myDB");
// const myColl = myDB.collection("pizzaMenu");

// const doc = { name: "Neapolitan pizza", shape: "round" };
// const result = await myColl.insertOne(doc);
// console.log(
//    `A document was inserted with the _id: ${result.insertedId}`,
// );

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);

const myDB = client.db("myDB");
const myColl = myDB.collection("colors");

try {
   const docs = [
      { "_id": 1, "color": "red"},
      { "_id": 2, "color": "purple"},
      { "_id": 1, "color": "yellow"},
      { "_id": 3, "color": "blue"}
   ];

   const insertManyresult = await myColl.insertMany(docs);
   let ids = insertManyresult.insertedIds;

   console.log(`${insertManyresult.insertedCount} documents were inserted.`);
   for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
   }
} catch(e) {
   console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
   let ids = e.result.result.insertedIds;
   for (let id of Object.values(ids)) {
      console.log(`Processed a document with id ${id._id}`);
   }
   console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
}