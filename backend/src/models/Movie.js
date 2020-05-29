const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  released: { type: String, required: true },
  runtime: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  actors: { type: String, required: true },
  plot: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  awards: { type: String, required: true },
  poster: { type: String, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Review",
    },
  ],
});

const Movie = model("Movie", MovieSchema);

module.exports = Movie;
