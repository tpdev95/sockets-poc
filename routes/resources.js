const express = require("express");
const router = express.Router();
const { resources_list, add_resource } = require("../controllers/resources");

router.get("/", resources_list);
router.post("/", add_resource);

module.exports = router;
