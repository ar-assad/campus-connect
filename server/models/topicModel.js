const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    selectedSpace: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    upvotes: [String],
    downvotes: [String],
    viewsCount: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

topicSchema.virtual("author", {
  ref: "User",
  localField: "owner",
  foreignField: "username",
  justOne: true,
});

module.exports = mongoose.model("Topic", topicSchema);
