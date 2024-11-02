const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  source: {
    type: String
  },
  language: {
    type: String,
    required: true,
    enum: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
    default: "English"
  },
  created_at: {
    type: Date,
    default: Date.now()  
    },
  likes: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["Inspiration", "Love", "Wisdom", "Motivation", "Humor"]
  }
});

exports.Quote = mongoose.model("Quote", quoteSchema);
