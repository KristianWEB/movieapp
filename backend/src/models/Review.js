const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  stars: { type: String, required: true },
  body: { type: String, required: true },
  approved: { type: Boolean, default: false },
  movieId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Movie",
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const Review = model("Review", ReviewSchema);

module.exports = Review;
