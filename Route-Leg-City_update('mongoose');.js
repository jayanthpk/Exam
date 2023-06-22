const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb+srv://jayanth:jayanth123@cluster0.tjshzg1.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'route';

// MongoClient options
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    wtimeout: 5000,
  },
};

// Function to update users in MongoDB
async function updateUsers(filter, update) {
  // Create a new MongoClient
  const client = new MongoClient(url, clientOptions);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Get the users collection
    const collection = db.collection('legs');

    // Update users
    const result = await collection.updateMany(filter, update);

    console.log(`${result.modifiedCount} users updated.`);
  } catch (err) {
    console.error('Error updating users:', err);
  } finally {
    // Close the connection
    client.close();
  }
}

// Example usage
const filter = { sourceCity: 'ad' };
const update = { $set: { sourceCity: 'RCB' } };
updateUsers(filter, update);
