const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now(),
  },
  exercise: [
    {
      type: {
        type: String,
        trim: true,
        required: "What is the type of exercise"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter a name of the exercise"
      },
      duration: {
        type: Number,
        trim: true,
        required: "Duration of exercise"
      },

      weight: {
        type: Number,
        trim: true,
        required: "Enter the weight"
      },
      reps: {
        type: Number,
        trim: true,
        required: "Number of Reps"
      },
      sets: {
        type: Number,
        trim: true,
        required: "Number of Sets"

      }
    }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
