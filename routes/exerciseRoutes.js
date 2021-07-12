const router = require('express').Router()
const { Exercise, Workout } = require('../models')

// GET all exercises
router.get('/exercises', (req, res) => Exercise.find()
  .populate('workout')
  .then(exercise => res.json(exercise))
  .catch(err => console.log(err)))

// POST one exercise
router.post('/exercises', (req, res) => Exercise.create(req.body)
  .then(exercise => {
    Workout.findByIdAndUpdate(exercise.workout, { $push: { exercises: exercise.id } })
      .then(() => res.json(exercise))
  })
  .catch(err => console.log(err)))

// PUT one exercise
router.put('/exercises/:id', (req, res) => Exercise.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one exercise
router.delete('/exercises/:id', (req, res) => Exercise.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
