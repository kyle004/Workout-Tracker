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

module.exports = router
