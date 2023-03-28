
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/information', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});
module.exports = mongoose.model('users', userSchema);