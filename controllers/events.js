const Event = require('../models/event');
const router = require('express').Router();

// Index Route

router.get('/', async (req, res) => {
  try {
    res.json(await Event.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Event CREATE ROUTE¬
router.post('/', async (req, res) => {
  try {
    // console.log(req.body);
    // send all Events
    console.log(req);
    res.json(await Event.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ message: `bad request` });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    res.status(200).json(await Event.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: `bad request` });
  }
});

// Update
router.patch('/:id', async (req, res) => {
  try {
    // Find the event by its ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new Error('Event not found');
    }

    // Extract the transaction field from the request body
    const transaction = req.body.transaction;

    // Push the new transaction to the event's transactions array
    event.transactions.push(transaction);

    // Save the updated event
    const updatedEvent = await event.save();

    // Send the updated event as the response
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: `bad request: ${error.message}` });
  }
});

// Show
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: `bad request` });
  }
});

module.exports = router;
