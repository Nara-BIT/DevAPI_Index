const Api = require("../models/Api");
const User = require("../models/User");
const Category = require("../models/Category");

exports.getPendingApis = async (req, res) => {
  try {
    const apis = await Api.find({ status: "pending" })
      .populate("submittedBy", "name email")
      .populate("category", "name slug")
      .sort("-createdAt");
    res.json(apis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveApi = async (req, res) => {
  try {
    const api = await Api.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!api) return res.status(404).json({ message: "API not found" });
    res.json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rejectApi = async (req, res) => {
  try {
    const api = await Api.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!api) return res.status(404).json({ message: "API not found" });
    res.json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalApis = await Api.countDocuments({ status: "approved" });
    const pendingApis = await Api.countDocuments({ status: "pending" });
    const totalUsers = await User.countDocuments();
    const totalCategories = await Category.countDocuments();
    res.json({ totalApis, pendingApis, totalUsers, totalCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const category = await Category.create({ name, slug, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
