const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      trim: true,
      maxlength: [100, "Target role cannot exceed 100 characters"],
    },
    currentSkills: {
      type: [String],
      required: [true, "Current skills are required"],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one current skill is required",
      },
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message:
          "Experience level must be beginner, intermediate, or advanced",
      },
    },
    roadmap: {
      type: [String],
      required: [true, "Roadmap is required"],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Roadmap must contain at least one step",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Roadmap ||
  mongoose.model("Roadmap", roadmapSchema);