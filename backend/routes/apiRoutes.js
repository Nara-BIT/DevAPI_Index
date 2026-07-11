const express = require("express");
const router = express.Router();
const {
  getAllApis,
  getApiById,
  createApi,
  submitApi,
  updateApi,
  deleteApi,
} = require("../controllers/apiController");
const { protect, admin } = require("../middleware/auth");

router.get("/", getAllApis);
router.get("/:id", getApiById);
router.post("/", protect, admin, createApi);
router.post("/submit", protect, submitApi);
router.put("/:id", protect, admin, updateApi);
router.delete("/:id", protect, admin, deleteApi);

module.exports = router;
