const mongoose = require("mongoose");

// Define the schema for storing generated career roadmaps
const roadmapSchema = new mongoose.Schema(
  {
    // Target role the user wants to achieve eg :- "Frontend Developer", "Backend Engineer"
    targetRole: {
      type: String, 
      required: [true, "Target role is required"], 
      trim: true, 
      maxlength: [100, "Target role cannot exceed 100 characters"], 
    },

    // List of skills the user already possesses ex :- ["HTML", "CSS", "JavaScript"]
    currentSkills: {
      type: [String], 
      required: [true, "Current skills are required"],
      validate: {
        // Ensure at least one skill is provided
        validator: (value) => Array.isArray(value) && value.length > 0,

        // Error message if validation fails
        message: "At least one current skill is required",
      },
    },

    // User's current experience level
    experienceLevel: {
      type: String, 
      required: [true, "Experience level is required"],
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        // Error message for invalid values
        message:
          "Experience level must be beginner, intermediate, or advanced",
      },
    },

    // Generated roadmap steps returned 
    // ex :- [  "Learn JavaScript fundamentals",  "Build React projects",  "Learn Node.js" ]
    roadmap: {
      type: [String], // Array of roadmap step strings
      required: [true, "Roadmap is required"],
      validate: {
        // Ensure roadmap contains at least one step
        validator: (value) => Array.isArray(value) && value.length > 0,

        // Error message if roadmap is empty
        message: "Roadmap must contain at least one step",
      },
    },
  },

  {
    // Automatically adds  --->  createdAt -> document creation time --->  updatedAt -> last update time
    timestamps: true,
  }
);

// Prevent model recompilation during hot reloads in Next.js.
// Reuse existing model if already registered.
module.exports =
  mongoose.models.Roadmap ||
  mongoose.model("Roadmap", roadmapSchema);