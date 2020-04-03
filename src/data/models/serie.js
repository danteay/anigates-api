import mongoose, { Schema } from 'mongoose';
import types from './../catalogs/types';
import categories from './../catalogs/categories';
import slugify from 'slugify';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true
    },
    url: String,
    image: String,
    episodes: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: types,
      required: true,
    },
    score: Number,
    categories: {
      type: [String],
      enum: categories,
    }
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  },
);

schema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    replacement: '-',
    lower: true,
    strict: true,
  });
});

export default mongoose.model('Serie', schema);