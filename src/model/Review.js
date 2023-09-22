const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    text: String,
  },
  { timestamps: true, id: true }
);

const Review = model('Review', reviewSchema);
module.exports = Review;
