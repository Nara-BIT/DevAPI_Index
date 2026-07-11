const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/apis", require("./routes/apiRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/bookmarks", require("./routes/bookmarkRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
