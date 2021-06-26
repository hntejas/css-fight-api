const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}

const mongoURL = "mongodb+srv://cssFightUser:" + process.env['DB_PASSWORD'] + "@cluster0.kfqiq.mongodb.net/data";

module.exports.corsOptions = corsOptions;
module.exports.mongoURL = mongoURL;