const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb');
const router = express.Router();

router.use(express.json());

router.post('/', validateUser, async (req, res) => {
  try {
    const newAccount = await Users.insert(newAccount);
    res.status(200).json(newAccount);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error adding new user.' });
  };
});

router.post('/:id/posts', async (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  try {
    const newPost = await Posts.insert(postInfo);
    res.status(200).json(newPost);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Error posting submission.' });
  };
});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({ message: 'Invalid user ID.' });
  } else {
    req.user = `${req.params.id}`;
  };
};

function validatePost(req, res, next) {

};

module.exports = router;
