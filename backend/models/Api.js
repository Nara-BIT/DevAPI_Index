const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "API name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    url: {
      type: String,
      required: [true, "API URL is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    authType: {
      type: String,
      enum: ["none", "api-key", "oauth2", "basic", "bearer"],
      default: "none",
    },
    cors: {
      type: Boolean,
      default: false,
    },
    https: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    docUrl: {
      type: String,
      default: "",
    },
    endpoints: [
      {
        method: {
          type: String,
          enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        },
        path: String,
        description: String,
        parameters: [
          {
            name: String,
            type: String,
            required: Boolean,
            description: String,
          },
        ],
        sampleResponse: {
          type: mongoose.Schema.Types.Mixed,
          default: null,
        },
      },
    ],
    avgRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

apiSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Api", apiSchema);
