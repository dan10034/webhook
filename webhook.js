const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  try {
    // Extract the "clickid" and "paymentAmount" from the incoming JSON data
    const { clickid, paymentAmount } = req.body;

    // Construct the postback URL
    const postbackURL = `https://track.stroy-still.shop/postback?clickid=${clickid}&payout=${paymentAmount}`;


    // Execute the postback by making an HTTP request
    axios.get(postbackURL)
      .then((response) => {
        console.log('Postback successful');
      })
      .catch((error) => {
        console.error('Postback failed:', error);
      });

    res.sendStatus(200); // Respond to the CRM with a success status
  } catch (error) {
    console.error('Error handling webhook data:', error);
    res.sendStatus(500); // Respond to the CRM with an error status
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});