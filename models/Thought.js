const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_lenth: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() + 5
        }`;
}

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}` ;
    })
 
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
