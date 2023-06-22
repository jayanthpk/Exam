const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const url = 'mongodb+srv://jayanth:jayanth123@cluster0.tjshzg1.mongodb.net';
  const databaseName = 'route'; // Specify your desired database name
  const collectionName = 'legs'; // Specify your desired collection name

  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName });

  const userSchema = new mongoose.Schema({
    sourceCity: String,
    destinationCity: String,
    cost: Number
  });

  userSchema.methods.introduce = function() {
    console.log(`Source City name is ${this.sourceCity}, Destination City is ${this.destinationCity}, and the cost is ${this.cost}.`);
  };

  const User = mongoose.model('User', userSchema, collectionName);

  // Find all users
  const users = await User.find();
  users.forEach(user => user.introduce());
}
