const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const url = 'mongodb+srv://jayanth:jayanth123@cluster0.tjshzg1.mongodb.net'; // Remove the extra double quote at the end
  const databaseName = 'route'; // Specify your desired database name
  const collectionName = 'legs'; // Specify your desired collection name

  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName });

  const userSchema = new mongoose.Schema({
    sourceCity: String,
    DestinationCity: String, // Corrected the capitalization of 'DestinationCity'
    cost: Number
  });

  userSchema.methods.introduce = function() {
    console.log(`Source City name is ${this.sourceCity}, Destination City is ${this.DestinationCity} and the cost is ${this.cost}.`);
  };

  const User = mongoose.model('User', userSchema, collectionName);

  const deletionResult = await User.deleteOne({ sourceCity: 'RCB' }); // Corrected the spelling of 'Bhubaneswar'
  console.log(`Deleted ${deletionResult.deletedCount} user.`);
}
