const express = 'express';

/* MIDDLEWARE */
const router = express.Router();

/* ROUTES */
router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

/* CUSTOM MIDDLEWARE */
function validatePostId(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({ message: 'Invalid post ID.' });
  } else {
    req.user = `${req.params.id}`;
  };
};

module.exports = router;