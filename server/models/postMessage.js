import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    memberID: String,
    loanAmount: Number,
    interestRate: Number,
    loanLength: Number,
    loanGrade: String,
    loanPurpose: String,
    emp_length:String,
    name: String,
    creator: String,
    price_code: {
        type: String,
        default: 'USD'
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    },
});


const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;