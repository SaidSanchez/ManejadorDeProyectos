const express = require('express');
const controller = require('../controllers/userStories');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('List of user Stories: ');
});

router.get('/', controller.getAll);
router.get('/:id', controller.getByID);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
