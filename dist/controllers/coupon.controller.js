"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCouponByIdController = GetCouponByIdController;
const GetCouponByIdService_1 = require("../Services/coupons.service/GetCouponByIdService");
async function GetCouponByIdController(req, res, next) {
    try {
        const user_id = req.user?.id;
        const result = await (0, GetCouponByIdService_1.GetCouponByIdService)(user_id);
        if ("message" in result) {
            return res.status(200).json({
                message: result.message,
                data: [],
            });
        }
        return res.status(200).json({
            message: "Active coupons retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}
