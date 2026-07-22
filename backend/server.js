import "dotenv/config";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start the HTTP server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
