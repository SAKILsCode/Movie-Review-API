const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster: String,
    releaseDate: Date,
    duration: String,
    totalRating: Number,
    genre: String,
    description: String,
  },
  { timestamps: true, id: true }
);

const Movie = model('Movie', movieSchema);
module.exports = Movie;
