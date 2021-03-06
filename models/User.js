const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type:  String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
});

// get total count of comments and replies on retrieval
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = model("User", UserSchema);

module.exports = User;