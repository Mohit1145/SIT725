const { MongoClient, ServerApiVersion } = require("mongodb");
 
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/";
 
async function insertData() {
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB server
        await client.connect();
 
        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("FoodPlaza");
 
        const pizzas = [
            { name: "Burger", ingredients: ["Sauce", "Cheese", "Onion"], price: 6.97 },
            { name: "Pasta", ingredients: ["tomato", "white_Sauce", "tommato"], price: 10.44 },
            { name: "Garlic_bread", ingredients: ["Bread", "bell peppers", "onion", "olives"], price: 20.49 }
        ];
       
 
        // Insert the data
        const result = await collection.insertMany(pizzas);
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}
 
 
async function fetchAllData() {
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB server
        await client.connect();
 
        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("FoodPlaza");
 
        // Fetch all documents from the collection
        const data = await collection.find().toArray();
 
        // Print the data
        console.log(data);
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}
 
 
// Run the function
insertData();
// Run the function
fetchAllData();
