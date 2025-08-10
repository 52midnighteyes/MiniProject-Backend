"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateQuery;
function validateQuery(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.query);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
