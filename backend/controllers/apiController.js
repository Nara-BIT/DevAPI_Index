const Api = require("../models/Api");

exports.getAllApis = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      authType,
      cors,
      https,
      search,
      sort = "-createdAt",
    } = req.query;

    const query = { status: "approved" };

    if (category) query.category = category;
    if (authType) query.authType = authType;
    if (cors !== undefined) query.cors = cors === "true";
    if (https !== undefined) query.https = https === "true";
    if (search) query.$text = { $search: search };

    const total = await Api.countDocuments(query);
    const apis = await Api.find(query)
      .populate("category", "name slug")
      .populate("submittedBy", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      apis,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApiById = async (req, res) => {
  try {
    const api = await Api.findById(req.params.id)
      .populate("category", "name slug")
      .populate("submittedBy", "name");

    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }

    res.json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createApi = async (req, res) => {
  try {
    const api = await Api.create({
      ...req.body,
      submittedBy: req.user._id,
      status: "approved",
    });
    res.status(201).json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitApi = async (req, res) => {
  try {
    const api = await Api.create({
      ...req.body,
      submittedBy: req.user._id,
      status: "pending",
    });
    res.status(201).json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateApi = async (req, res) => {
  try {
    const api = await Api.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }
    res.json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteApi = async (req, res) => {
  try {
    const api = await Api.findByIdAndDelete(req.params.id);
    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }
    res.json({ message: "API removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
