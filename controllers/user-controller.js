const {User} = require("../models");

const userController = {

    //gets all users and their corresponding thoughts: Get /api/users
    getUsers(req, res) {
        User.find({}).populate({
            path: "thoughts",
            select: ["-__v"],
        }).populate({
            path: "friends",
            select: ["-__v", "-email", "-thoughts", "-friends"],
        })
          .then((users) => {
            if (!users) {
              res.status(404).json({ message: "There are currently no users" });
              return;
            }
            res.json(users);
          })
          .catch((err) => res.json(err));
      },

      //gets a single user and their corresponding thoughts: Get /api/users/:id
      getUser(req, res){
          User.findById(req.params.id).populate({
              path: "thoughts",
              select: ["-__v"],
          }).then((user)=>{
              if(!user){
                  res.status(404).json({message: "No user with this id"})
              }
              res.json(user);
          }).catch((err)=>{
              res.json(err);
          })
      },

    //adds a new user: Post /api/users
    addUser(req, res){
        User.create(req.body)
        .then((user)=>{
            res.json(user);
        }).catch((err) => res.json(err));
    },

    //edits a user's data: Put /api/users/:id
    editUser(req, res){
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true} ).then((user)=>{
            if(!user){
                res.status(404).json({message: "No user with this id"});
            }
            res.json(user);
        }).catch((err)=>{
            res.json(err);
        })
    },

    //removes a user from the database: Delete /api/users/:id
    deleteUser(req, res){
        User.deleteOne({_id: req.params.id}).then((user)=>{
            if(!user){
                res.status(404).json({message: "No user with this id"});
            }
            res.json(user);
        }).catch((err)=>{
            res.json(err);
        });
    },

    //adds a friend to a user's friend array: Post /api/users/:userId/friends/:friendId
    addFriend(req, res){
        User.findById(req.params.friendId)
        .then((friend)=>{
            if(!friend){
                res.status(404).json({message: "Friend could not be found, no user with this id"})
            }
            return User.findOneAndUpdate(
                {_id: req.params.userId}, 
                {$push: {friends: req.params.friendId}},
                {new: true},
                ).populate({
                    path: "friends",
                    select: ["-__v", "-email", "-thoughts", "-friends"],
                });
        }).then((user)=>{
            if(!user){
                res.status(404).json({message: "No user with this id"})
            }
            res.json(user);
        }).catch((err)=>{
            res.json({message: "Friend or user ID may be incorrect", err});
        })
    },
    //removes a friend from a user's friend array: Delete /api/users/:userId/friends/:friendId
    removeFriend(req, res){
        User.findById(req.params.friendId)
        .then((friend)=>{
            if(!friend){
                res.status(404).json({message: "Friend could not be found, no user with this id"})
            }
            return User.findOneAndUpdate(
                {_id: req.params.userId}, 
                {$pull: {friends: req.params.friendId}},
                {new: true},
                ).populate({
                    path: "friends",
                    select: ["-__v", "-email", "-thoughts", "-friends"],
                });
        }).then((user)=>{
            if(!user){
                res.status(404).json({message: "No user with this id"})
            }
            res.json(user);
        }).catch((err)=>{
            res.json({message: "Friend or user ID may be incorrect", err});
        })
    }


};

module.exports = userController;