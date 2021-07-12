const router = require('express').Router()
const { Workout } = require('../models')

router.get('/workouts', (req, res) => {
  Workout.aggregate([{
    $addFields: {
      totalDuration: { $sum: '$exercises.duration' }
    }
  }])
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.put('/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } },
    { new: true, runValidators: true })
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.post('/workouts', (req, res) => {
  Workout.create({})
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.get('/workouts/range', (req, res) => {
  Workout.find({})
    .limit(7)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
})

module.exports = router
