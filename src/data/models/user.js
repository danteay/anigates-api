import mongoose from "mongoose";
import { hash } from "bcryptjs";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [6, "invalid email length"]
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "invalid name length"]
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }

  next();
});

export default mongoose.model("User", schema);
