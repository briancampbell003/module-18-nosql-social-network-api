const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            max_length: 50,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            // match: [
            //     /^[A-Z0-9._%+-]@[A-Z0-9.-]\.[A-Z]{2,63}$/, 'Please provide a valid email address.'
            // ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },            
         ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

const User = model('User', userSchema);

module.exports = User;
