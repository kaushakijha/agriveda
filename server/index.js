require("./config/connectDB.js");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const stats = require("./routes/stats.js");

const { setupWebSocket } = require("./services/setupWebSocket");

const product = require("./routes/product");
const review = require("./routes/review");
const order = require("./routes/order");
const faq = require("./routes/faq");
const graph = require("./routes/graph.js");
const ai = require("./routes/ai.js");
const auth = require("./routes/auth");
const contactRoute = require("./routes/contact.js");

const PORT = 8080;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/contact", contactRoute);
const server = http.createServer(app);
const io = new Server(server);

setupWebSocket(io);

// Health Check
app.get("/", (req, res) => {
  res.send("CropConnect Server is running");
});

// Routes
app.use("/auth", auth);
app.use("/products", product);
app.use("/reviews", review);
app.use("/order", order);
app.use("/faqs", faq);
app.use("/graph", graph);
app.use("/ai", ai);
app.use("/api/stats", stats);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
