const router = require("express").Router();
const {Workout} = require("../../models");

// router.post("/api/workout", ({ body }, res) => {
//   Workout.create(body)
//     .then(dbworkout => {
//       res.json(dbworkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

router.post("/", async ({ body }, res) => {
  Workout.create(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/", async  (req, res) => {
  Workout.find({}).then(dbworkouts => {res.json(dbworkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



//PUT 
//exercise exists inside a workout so update workout
router.put("/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
    }
  )
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE 
router.delete("/:id", (req, res) => {
  Workout.findByIdAndDelete(
    {
      _id: req.params.id,
    },
    {
      remove: {
        exercises: req.body,
      },
    }
  )
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


router.get("/range", (req, res) => {
    //all purpose tool for data manipulation
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $add: ['$exercises.duration']},
      },
    },
  ])
    .then((getWorkout) => {
      res.json(getWorkout);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
