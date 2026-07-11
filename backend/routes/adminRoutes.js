const express = require("express");
const router = express.Router();
const {
  getPendingApis,
  approveApi,
  rejectApi,
  getStats,
  createCategory,
  deleteCategory,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/auth");

router.get("/stats", protect, admin, getStats);
router.get("/apis/pending", protect, admin, getPendingApis);
router.put("/apis/:id/approve", protect, admin, approveApi);
router.put("/apis/:id/reject", protect, admin, rejectApi);
router.post("/categories", protect, admin, createCategory);
router.delete("/categories/:id", protect, admin, deleteCategory);

module.exports = router;
