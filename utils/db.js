const mongoose = require('mongoose');
const {mongoURL} = require('./configs');
mongoose.plugin(require('meanie-mongoose-to-json'));

module.exports.init = async () => {
  try{
    console.log()
    await mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log("db connected")
  }catch(e){
    console.log("error connecting to db", e)
  }
}