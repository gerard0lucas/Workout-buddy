const express = require('express')
const {getworkouts,findworkout, postworkouts, deleteworkout, updateworkout} = require('../controllers/workoutscontrollers')
const requireAuth = require("../middleware/requireAuth")
const router = express.Router()

router.use(requireAuth)


// ....................Get Request.....................
router.get("/",getworkouts)

// ....................Get by id Request.....................
router.get("/:id",findworkout)

// ....................post Request.....................
router.post("/",postworkouts)

// ....................delete by id Request.....................
router.delete("/:id",deleteworkout)

// ....................Update by id Request.....................
router.patch("/:id",updateworkout)

module.exports = router;