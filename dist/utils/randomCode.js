"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCodeGenerator = randomCodeGenerator;
const nanoid_1 = require("nanoid");
function randomCodeGenerator(prefix) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const generateId = (0, nanoid_1.customAlphabet)(alphabet, 5);
    return prefix + generateId();
}
