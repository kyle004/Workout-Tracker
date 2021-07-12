const { model, Schema } = require('mongoose')

const Workout = new Schema({
  day: { type: Date, default: () => new Date() },
  exercises:[{
    type: { type: String },
    name: { type: String },
    duration: { type: Number },
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
  }]
},
{
  toJSON: {
    virtuals: true,
  }
})

module.exports = model('Workout', Workout)
