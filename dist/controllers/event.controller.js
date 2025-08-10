"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventAttendersByDateController = GetEventAttendersByDateController;
exports.CreateEventController = CreateEventController;
exports.GetEventDetailsByIdController = GetEventDetailsByIdController;
exports.ConfirmEventAttendersController = ConfirmEventAttendersController;
const GetEventAttendersByDateService_1 = __importDefault(require("../Services/event.service/GetEventAttendersByDateService"));
const CreateEventService_1 = __importDefault(require("../Services/event.service/CreateEventService"));
const GetEventDetailsService_1 = require("../Services/event.service/GetEventDetailsService");
const ConfirmEventAttenders_1 = __importDefault(require("../Services/event.service/ConfirmEventAttenders"));
async function GetEventAttendersByDateController(req, res, next) {
    try {
        const event_id = req.query.event_id;
        const response = (0, GetEventAttendersByDateService_1.default)({ event_id });
        res.status(200).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function CreateEventController(req, res, next) {
    try {
        const organizer_id = req.user?.id;
        const event = await (0, CreateEventService_1.default)({
            ...req.body,
            organizer_id,
        });
        return res.status(201).json({
            message: "Event created successfully",
            data: event,
        });
    }
    catch (err) {
        next(err);
    }
}
async function GetEventDetailsByIdController(req, res, next) {
    try {
        const event_id = req.query.event_id;
        const event = await (0, GetEventDetailsService_1.GetEventDetailsByIdService)({
            event_id,
        });
        return res.status(200).json({
            message: "success",
            data: event,
        });
    }
    catch (err) {
        next(err);
    }
}
async function ConfirmEventAttendersController(req, res, next) {
    try {
        const organizer_id = req.user?.id;
        const ticket_code = req.query.ticket_code;
        const response = await (0, ConfirmEventAttenders_1.default)({
            organizer_id,
            ticket_code,
        });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
