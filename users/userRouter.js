const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb');
const router = express.Router();

/* MIDDLEWARE */
router.use(express.json());

/* ROUTES */
router.post('/', validateUser, async (req, res) => {
  try {
    const newAccount = await Users.insert(newAccount);
    res.status(200).json(newAccount);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error adding new user.' });
  };
});

router.post('/:id/posts', validatePost, async (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  try {
    const newPost = await Posts.insert(postInfo);
    res.status(200).json(newPost);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error posting submission.' });
  };
});

router.get('/', async (req, res) => {
  try {
    const allAccounts = await Users.get(req.query);
    res.status(200).json(allAccounts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving users.' });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const userAccount = await Users.getById(req.params.id);
    res.status(200).json(userAccount);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving user data.' });
  };
});

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Posts.get(req.params.id);
    res.status(200).json(posts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving posts.' });
  };
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    res.status(200).json(await Users.remove(req.params.id));
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting user.' });
  };
});

router.put('/:id', validateUserId, async (req, res) => {
  try {
    res.status(200).json(await Users.update(req.params.id, req.body));
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating user.' });
  };
});

/* CUSTOM MIDDLEWARE */
function validateUserId(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({ message: 'Invalid user ID.' });
  } else {
    req.user = `${req.params.id}`;
  };
};

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'Missing user data.' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required data in name field.' });
  };
  next();
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'Missing post content.' });
  } else if (!req.body.text) {
    req.status(400).json({ message: 'Missing required data in text field.' });
  };
  next();
};

module.exports = router;
