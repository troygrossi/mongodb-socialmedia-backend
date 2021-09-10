const {Thought, User} = require("../models");

const thoughtController = {
    getThoughts(req, res){
        Thought.find({}).select("-__v").then((thoughts)=>{
            if(!thoughts){
                res.status(404).json({ message: "There are currently no thoughts" });
            }
            else{
                res.json(thoughts);
            }
        }).catch((error)=> res.json(error));
    },

    getThought(req, res){
        Thought.findById(req.params.id).then((thought)=>{
            if(!thought){
                res.status(404).json({message: "Cannot find any thoughts with this id"});
            }
            res.json(thought);
        }).catch((err)=>{
            res.json({message: "Check if id is valid", err});
        });
    },

    addThought(req, res){
        Thought.create(req.body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: {thoughts: _id}},
                {new: true},
            ).populate({
                path: "thoughts",
                select: "-__v",
            });
        }).then((userAndThoughts)=>{
            if(!userAndThoughts){
                res.status(404).json({message: "No user with this id"});
            }
            res.json(userAndThoughts);
        }).catch((error)=> res.json(error));
    },

    editThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true},
            )
            .then((thought)=>{
                if(!thought){
                    res.status(404).json("Cannot find any thoughts with this id")
                }
                res.json(thought)
            })
            .catch((err)=>{
                res.json({message: "Check if id is valid", err});
            });
    },

    deleteThought(req, res){
        Thought.deleteOne({_id: req.params.id})
        .then((thought)=>{
            if(!thought){
                res.status(404).json({message: "Cannot find any thoughts with this id"});
            }
            res.json({message: "Deleted Thought", thought});
        }).catch((err)=>{
            res.json({message: "Check if id is valid", err});
        });
    },

    addReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true},
        ).then((thought)=>{
            if(!thought){
                res.status(404).json({message: "Cannot find any thoughts with this id"});
            }
            res.json({message: "Added reaction", thought});
        }).catch((err)=>{
            res.json({message: "Check if id is valid", err});
        });
    },

    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: req.params.reactionId}},
            {new: true},
        ).then((thought)=>{
            if(!thought){
                res.status(404).json({message: "Cannot find any thoughts with this id"});
            }
            res.json({message: "Deleted reaction", thought});
        }).catch((err)=>{
            res.json({message: "Check if id is valid", err});
        });
    },       
    
};

module.exports = thoughtController;