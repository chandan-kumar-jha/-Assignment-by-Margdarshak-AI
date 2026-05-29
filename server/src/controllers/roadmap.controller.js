const Roadmap = require("../models/roadmap.model.js");
const { generateRoadmap } = require("../utils/roadmapGenerator.js");


const VALID_LEVELS = ["beginner", "intermediate", "advanced"];

/*
Generate a new roadmap
Route: POST /api/roadmaps
 */
const generate = async (req, res) => {
  try {
    // Extract data sent by the client in the request body.
    const { targetRole, currentSkills, experienceLevel } = req.body;

    // Validate targetRole: Must exist , string , not be empty after trimming spaces
    if (!targetRole || typeof targetRole !== "string" || !targetRole.trim()) {
      return res.status(400).json({
        error: "Target role is required and must be a non-empty string",
      });
    }

    // Validate currentSkills: Must be an array and contain at least one skill
    if (!Array.isArray(currentSkills) || currentSkills.length === 0) {
      return res.status(400).json({
        error: "Current skills must be a non-empty array",
      });
    }

    // Validate experienceLevel: Must be one of the allowed values
    if (!VALID_LEVELS.includes(experienceLevel)) {
      return res.status(400).json({
        error:
          "Experience level must be one of: beginner, intermediate, advanced",
      });
    }

    // Generate roadmap steps using utility function.
    const roadmapSteps = generateRoadmap({
      targetRole,
      currentSkills,
      experienceLevel,
    });

    // Create and save a new roadmap document in MongoDB.
    const roadmap = await Roadmap.create({
      targetRole: targetRole.trim(),
      currentSkills,
      experienceLevel,
      roadmap: roadmapSteps,
    });

    // Return success response with created document.
    return res.status(201).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

/*
Get all roadmaps
Route: GET /api/roadmaps
 */
const getAll = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({})
      .sort({ createdAt: -1 })
      // Convert Mongoose documents into plain JavaScript objects.
      .lean();
    // Return all roadmaps.
    return res.status(200).json({
      success: true,
      data: roadmaps,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

/*
Get a single roadmap by ID
Route: GET /api/roadmaps/:id
 */
const getOne = async (req, res) => {
  try {
    // Find roadmap using ID from URL parameter.
    const roadmap = await Roadmap.findById(req.params.id).lean();
    if (!roadmap) {
      return res.status(404).json({
        error: "Roadmap not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

/*
Delete a roadmap by ID
Route: DELETE /api/roadmaps/:id
 */
const remove = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!roadmap) {
      return res.status(404).json({
        error: "Roadmap not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Roadmap deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Export controller functions so routes can use them.
module.exports = {
  generate,
  getAll,
  getOne,
  remove,
};