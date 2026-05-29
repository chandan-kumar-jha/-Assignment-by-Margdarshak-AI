const express = require("express");
const controller = require("../controllers/roadmap.controller.js");

const router = express.Router();

router.post("/generate", controller.generate);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.delete("/:id", controller.remove);

module.exports = router;