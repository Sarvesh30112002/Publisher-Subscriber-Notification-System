// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Internal data structure to store topics and subscribers
const topics = {};

// API endpoints-------
// Subscribe API
// Subscribe API
app.post('/subscribe', (req, res) => {
    const { topicId, subscriberId } = req.body;

    // Ensure topic exists in topics object
    if (!topics[topicId]) {
        topics[topicId] = new Set();
    }

    // Check if subscriber is already subscribed to the topic
    if (topics[topicId].has(subscriberId)) {
        return res.status(200).send(`Subscriber ${subscriberId} is already subscribed to ${topicId}\n`);
    }

    // Add subscriber to the topic
    topics[topicId].add(subscriberId);
    const message = `Subscriber ${subscriberId} subscribed to ${topicId}\n`;
    console.log(message); // Log the message for debugging
    res.status(200).send(message);
});


// Notify API
app.post('/notify', (req, res) => {
    const { topicId } = req.body;

    // Check if the topic exists
    if (!topics[topicId]) {
        return res.status(404).send('Topic not found');
    }

    // Check if there are subscribers to notify
    if (topics[topicId].size === 0) {
        return res.status(200).send('No subscribers found to notify\n');
    }

    // Notify all subscribers of the topic
    const subscribers = Array.from(topics[topicId]);
    const message = `Notified Succesfully to following Subscriber: ${subscribers.join(', ')}\n`;
    console.log(message); // Log the message for debugging
    res.status(200).send(message);
});


// Unsubscribe API
app.post('/unsubscribe', (req, res) => {
    const { topicId, subscriberId } = req.body;

    // Check if the topic and subscriber exist
    if (!topics[topicId] || !topics[topicId].has(subscriberId)) {
        return res.status(404).send('Subscriber not found for the given topic');
    }

    // Remove subscriber from the topic
    topics[topicId].delete(subscriberId);
    const message = `Subscriber ${subscriberId} unsubscribed from ${topicId}\n`;
    console.log(message); // Log the message for debugging
    res.status(200).send(message);
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
