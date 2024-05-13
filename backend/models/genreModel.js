import mongoose from "mongoose";

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
