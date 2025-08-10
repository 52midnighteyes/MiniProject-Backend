"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const AppError_utils_1 = require("./classes/AppError.utils");
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const transaction_router_1 = __importDefault(require("./routers/transaction.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const event_router_1 = __importDefault(require("./routers/event.router"));
const coupon_router_1 = __importDefault(require("./routers/coupon.router"));
const point_router_1 = __importDefault(require("./routers/point.router"));
const port = config_1.PORT || 8000;
const app = (0, express_1.default)();
//MIDDLEWARE
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log("===== Incoming Request =====");
    console.log("Time     :", new Date().toISOString());
    console.log("Method   :", req.method);
    console.log("URL      :", req.originalUrl);
    console.log("Headers  :", req.headers);
    console.log("Body     :", req.body);
    console.log("Query    :", req.query);
    console.log("============================\n");
    next();
});
app.get("/api", (req, res) => {
    res.send("API is Running");
});
//ROUTER
app.use("/api/auth", auth_router_1.default);
app.use("/api/transactions", transaction_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/events", event_router_1.default);
app.use("/api/coupons", coupon_router_1.default);
app.use("/api/points", point_router_1.default);
// UKNOWN ROUTE FALLBACK
app.use((req, res, next) => {
    next(new AppError_utils_1.AppError(404, "Route not found"));
});
// GLOBAL ERROR HANDLER
app.use(errorHandler_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
