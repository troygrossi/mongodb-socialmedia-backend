const router = require("express").Router();
const {getThoughts, getThought, addThought, addReaction, editThought, deleteThought, deleteReaction} = require("../../controllers/thought-controller.js");

router.get("/", getThoughts);
router.get("/:id", getThought);
router.post("/:userId", addThought);
router.post("/:thoughtId/reactions", addReaction);
router.put("/:id", editThought);
router.delete("/:id", deleteThought);
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);


module.exports = router;