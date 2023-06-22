const mongoose = require('mongoose');

// Replace <connection_string> with your actual MongoDB connection string
const url = 'mongodb+srv://jayanth:jayanth123@cluster0.tjshzg1.mongodb.net';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    main().catch(err => console.log(err));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

async function main() {
  const databaseName = 'route'; // Specify your desired database name
  const collectionName = 'legs'; // Specify your desired collection name

  const userSchema = new mongoose.Schema({
    sourceCity: String,
    DestinationCity: String,
    cost: Number
  });

  userSchema.methods.introduce = function() {
    console.log(`Source City name is ${this.sourceCity}, Destination City is ${this.DestinationCity}, and the cost is ${this.cost}.`);
  };

  const User = mongoose.model('Route', userSchema, collectionName);

  const user1 = new User({ sourceCity: 'Jamshedpur', DestinationCity: 'Bangalore', cost: 10000 });
  await user1.save();
  user1.introduce();

  const user2 = new User({ sourceCity: 'Mumbai', DestinationCity: 'Bhubaneswar', cost: 120000 });
  await user2.save();
  user2.introduce();

  const users = await User.find();
  console.log(users);
}
