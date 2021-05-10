import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
/* eslint-disable */

interface Address{
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface UserAttrs {
  name: string;
  username: string;
  email: string;
  address: Address,
  phone: string;
  website: string;
  company : Company;
  userId: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  address: Address,
  phone: string;
  website: string;
  company : Company;
  userId: string
}

interface UserModel extends mongoose.Model<any> {
  /* eslint-disable */
  build(attrs: UserAttrs): UserDoc;
}

autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    company: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true
    }
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

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>(
  'User',
  userSchema
);
export { User, UserAttrs, userSchema };
