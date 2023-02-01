const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought
} = require ('../../controllers/thoughtController');

//api/thoughts
router.route('/').get(getThoughts);
router.route('/').post(addThought);

//api/thoughts/:id
router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;
