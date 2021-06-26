const mongoose = require("mongoose");

const {Schema} = mongoose;

const AttemptSchema = new Schema({
  fightId: Number,
  user: {type: Schema.Types.ObjectId, ref: "User"},
  fightHighScore: {type: Number, default: 0},
  fightLastScore: {type: Number, default: 0},
  fightCode: String
});

const Attempt = mongoose.model('Attempt', AttemptSchema);

module.exports = Attempt;