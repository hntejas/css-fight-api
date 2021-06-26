const express = require('express');
const router = express.Router();
const resemble = require("resemblejs");
resemble.outputSettings({ useCrossOrigin: false });

const Attempt = require("../models/attempt.model");

router.get('/', async (req, res) => {
  const attempts = await Attempt.find({user: req.uid}, 'fightId fightCode fightHighScore fightLastScore');

  res.json({
    success: true,
    fights: attempts
  });
});

router.post('/save', async (req, res) => {
  const {fightId, fightCode} = req.body;

  const attempt = await Attempt.findOneAndUpdate({user: req.uid, fightId: fightId}, {fightId, fightCode, user: req.uid},{upsert: true});

  res.json({
    success: true
  });
});

router.post("/submit", async (req, res) => {
  const { targetImg, sourceImg, fightId, fightCode } = req.body;

  const savedAttempt = await Attempt.findOneAndUpdate(
    { user: req.uid, fightId: fightId },
    { fightId, fightCode, user: req.uid },
    { upsert: true, new: true }
  );

  resemble(targetImg)
  .compareTo(sourceImg)
  .onComplete(async (data) => {
    const userScore = calculateScore(data, savedAttempt);

    const attempt = await Attempt.findOneAndUpdate(
      { user: req.uid, fightId: fightId },
      { fightId, user: req.uid, ...userScore },
      { upsert: true, new: true }
    );

    res.send({
      success: true,
      scores: userScore,
    });
  });
});

function calculateScore(data, attempt){
  const score = parseFloat((100 - data.rawMisMatchPercentage).toFixed(2));
  return {
    fightLastScore: score,
    fightHighScore: attempt.fightHighScore > score ? attempt.fightLastScore : score
  }  

}

module.exports = router;