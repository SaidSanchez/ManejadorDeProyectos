const express = require('express');
const controller = require('../controllers/columns');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Columns');
});

router.get('/:id', controller.get);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;