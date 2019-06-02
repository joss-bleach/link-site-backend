import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  upVotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      name: {
        type: Schema.Types.String,
        refs: 'User'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Post = mongoose.model('Post', postSchema);
export default Post;
