const {Thought, User} = require("../models");

const thoughtController = {

    //gets all thoughts and their corresponding reactions: Get /api/thoughts
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

    //gets a single thought and its corresponding reactions: Get /api/thoughts/:id
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

        //adds a new thought: Post /api/thoughts/:userId
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

        //edits a thoughts's data: Put /api/thoughts/:id
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

        //removes a thought from the database: Delete /api/users/:id
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
        //adds a reaction to a thought: Post /api/thoughts/:thoughtId/reactions
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
        //delets a reaction from a thought: Delete /api/thoughts/:thoughtId/reactions/reactionId
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {_id: req.params.reactionId}}},
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