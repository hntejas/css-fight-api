const mongoose = require("mongoose");

const {Schema} = mongoose;

const FightSchema = new Schema({
  fightId: Number,
  fightName: String,
  fightImg: String,
  fightColors: [String]
});

const Fight = mongoose.model('Fight', FightSchema);

module.exports = Fight;