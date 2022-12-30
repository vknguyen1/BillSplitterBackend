const Member = require('../models/member');
const router = require('express').Router();

// Index Route

router.get('/', async (req, res) => {
  try {
    res.json(await Member.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Member CREATE ROUTE
router.post('/', async (req, res) => {
  try {
    // console.log(req.body);
    // send all Members
    console.log(req);
    res.json(await Member.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ message: `bad request` });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    res.status(200).json(await Member.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: `bad request` });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    res.status(200).json(
      await Member.findByIdAndUpdate(
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

// Show
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: `bad request` });
  }
});

module.exports = router;
