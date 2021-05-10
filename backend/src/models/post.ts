import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
/* eslint-disable */

interface PostAttrs {
  title: string;
  body: string;
  userId: number;
}

interface PostDoc extends mongoose.Document {
  title: string;
  body: string;
  userId: number;
}

interface PostModel extends mongoose.Model<any> {
  /* eslint-disable */
  build(attrs: PostAttrs): PostDoc;
}

autoIncrement.initialize(mongoose.connection);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        /* eslint-disable */
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
  
);

postSchema.statics.build = (attrs: PostAttrs) => new Post(attrs);

postSchema.plugin(autoIncrement.plugin, {
  model: "Post",
  field: "id"
})

const Post = mongoose.model<PostDoc, PostModel>(
  'Post',
  postSchema
);
export { Post, PostAttrs, postSchema };
