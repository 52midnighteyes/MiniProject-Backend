"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFilter = DateFilter;
function DateFilter(days) {
    const response = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return response;
}
