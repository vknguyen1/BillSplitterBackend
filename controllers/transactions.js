const Transaction = require('../models/transaction');
const router = require('express').Router();

// Index Route

router.get('/', async (req, res) => {
  try {
    res.json(await Transaction.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Transaction CREATE ROUTE
router.post('/', async (req, res) => {
  try {
    // console.log(req.body);
    // send all Transactions
    console.log(req);
    res.json(await Transaction.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ message: `bad request` });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    res.status(200).json(await Transaction.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: `bad request` });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    res.status(200).json(
      await Transaction.findByIdAndUpdate(
        //findByIdandUpdate has 4 Params
        // 1) is finding ID
        req.params.id,
        // 2) getting the information
        req.body,
        // 3) new: true return new value of object to see what it is udpated to. if false, then get old one.
        { new: true },
        // 4) callback
      ),
    );
  } catch (error) {
    res.status(400).json({ message: `bad request` });
  }
});

module.exports = router;
