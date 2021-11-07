const router = require("express").Router();
const {Workout} = require("../../models");



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
  console.log("getting")
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
    
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: '$exercises.duration'},
        totalDistance: { $sum: '$exercises.distance'},
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
