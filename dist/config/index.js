"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_ORIGIN = exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.SERVER_KEY = exports.CLIENT_KEY = exports.FE_URL = exports.USER_PASS = exports.USER_EMAIL = exports.isDev = exports.SECRET_KEY = exports.PORT = void 0;
require("dotenv/config");
_a = process.env, exports.PORT = _a.PORT, exports.SECRET_KEY = _a.SECRET_KEY, exports.isDev = _a.isDev, exports.USER_EMAIL = _a.USER_EMAIL, exports.USER_PASS = _a.USER_PASS, exports.FE_URL = _a.FE_URL, exports.CLIENT_KEY = _a.CLIENT_KEY, exports.SERVER_KEY = _a.SERVER_KEY, exports.CLOUDINARY_API_KEY = _a.CLOUDINARY_API_KEY, exports.CLOUDINARY_API_SECRET = _a.CLOUDINARY_API_SECRET, exports.CLOUDINARY_CLOUD_NAME = _a.CLOUDINARY_CLOUD_NAME, exports.CORS_ORIGIN = _a.CORS_ORIGIN;
