// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mondoDB = process.env.MONGO_URI || 'mongodb+srv://data-deveshwadibhasme:120305@cluster0.cf18n.mongodb.net/'
mongoose.connect(mondoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Missing Person Schema
const missingPersonSchema = new mongoose.Schema({
  name: String,
  age: Number,
  description: String,
  lastSeen: Date,
  contact: String,
  image: String,
  found: { type: Boolean, default: false },
  dateReported: { type: Date, default: Date.now }
});

const MissingPerson = mongoose.model('MissingPerson', missingPersonSchema);

// Routes
app.post('/api/missing', async (req, res) => {
  try {
    const newPerson = new MissingPerson(req.body);
    await newPerson.save();
    res.status(201).send(newPerson);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/missing', async (req, res) => {
  try {
    const { name, age } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (age) query.age = age;

    const persons = await MissingPerson.find(query);
    res.send(persons);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/missing/:id/found', async (req, res) => {
  try {
    const person = await MissingPerson.findByIdAndUpdate(
      req.params.id,
      { found: true },
      { new: true }
    );

    if (!person) return res.status(404).send();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Add to PUT route
    transporter.sendMail({
      from: 'deveshwadibhasme.03@gmail.com',
      to: person.contact,
      subject: 'Family Member Found!',
      html: `<h2>${person.name} has been located!</h2>
             <p>Our system has received confirmation that ${person.name} 
             has been found. Please contact authorities for reunion details.</p>`
    });

    // In production: Add email/SMS notification here
    console.log(`Notification should be sent to: ${person.contact}`);
    res.send(person);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add to server.js
// const twilio = require('twilio');
// const client = new twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Enhanced PUT route
app.put('/api/missing/:id/found', async (req, res) => {
  try {
    const person = await MissingPerson.findById(req.params.id);
    if (!person) return res.status(404).send();

    // Send SMS notification
    // await client.messages.create({
    //   body: `Your family member ${person.name} has been found! Please check the portal for details.`,
    //   from: process.env.TWILIO_PHONE,
    //   to: person.contact
    // });

    // // Update record
    // person.found = true;
    // await person.save();

    // res.send(person);
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).send(error);
  }
});

// Add to server.js
missingPersonSchema.index({ name: 'text', description: 'text' });

// Enhanced GET route
app.get('/api/missing/search', async (req, res) => {
  try {
    const results = await MissingPerson.find({
      $text: { $search: req.query.q },
      found: false
    }).sort({ dateReported: -1 });

    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));