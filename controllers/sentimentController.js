const vader = require('vader-sentiment');

exports.analyzeSentiment = (req, res) => {
  const { text } = req.body;
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  let sentiment;
  if (intensity.compound >= 0.05) {
    sentiment = 'positive';
  } else if (intensity.compound <= -0.05) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  res.json({ sentiment, intensity });
};
