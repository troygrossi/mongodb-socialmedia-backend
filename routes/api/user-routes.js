const router = require("express").Router();
const {getUsers, getUser, addUser, addFriend, removeFriend, editUser, deleteUser} = require("../../controllers/user-controller");


router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.post("/:userId/friends/:friendId", addFriend);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.delete("/:userId/friends/:friendId", removeFriend)

module.exports = router;