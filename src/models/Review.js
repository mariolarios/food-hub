const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a review rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide a review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    meal: {
      type: mongoose.Schema.ObjectId,
      ref: "Meal",
      required: true,
    },
  },
  { timestamps: true }
);
/// set up index for both the user and the meal
/// sets up that the user can only leave one review per meal
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });



module.exports = mongoose.model("Review", ReviewSchema);
