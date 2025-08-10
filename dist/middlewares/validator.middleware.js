"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
function validate(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
