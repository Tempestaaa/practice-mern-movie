import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actor: {
      type: [String],
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    genres: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Genre",
    },
  },
  {
    timestamps: true,
  }
);

export default Movie;
