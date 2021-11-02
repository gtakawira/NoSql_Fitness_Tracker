const router = require("express").Router();
const {Workout} = require("../../models/workout.js");

// router.post("/api/workout", ({ body }, res) => {
//   Workout.create(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

router.post("/api/transaction/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("workouts", (req, res) => {
  Workout.find({})
    // .sort({ date: -1 })
    console.log("get Workouts")
    .then(dbworkouts => {
      res.json(dbworkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
