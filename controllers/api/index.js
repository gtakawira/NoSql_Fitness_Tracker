const router = require('express').Router();
const workoutRoutes = require('./api.js');

router.use('/workouts', workoutRoutes);

module.exports = router;