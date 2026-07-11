const User = require("../models/User");

exports.toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const apiId = req.params.apiId;

    const index = user.bookmarks.indexOf(apiId);
    if (index === -1) {
      user.bookmarks.push(apiId);
    } else {
      user.bookmarks.splice(index, 1);
    }

    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      populate: { path: "category", select: "name slug" },
    });
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
