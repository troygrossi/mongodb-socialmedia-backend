const {Schema, model} = require("mongoose");

const formatDate = function(date){
    const fDate = new Date(date);
    return fDate.toLocaleString();
};

const ThoughtSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
    },
    reactions: [
        {
        username: {
            type: String,
            required: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        reactionId: Schema.Types.ObjectId,
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate,
    },
});
ThoughtSchema.set('toObject', { getters: true });
ThoughtSchema.set('toJSON', { getters: true });

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;