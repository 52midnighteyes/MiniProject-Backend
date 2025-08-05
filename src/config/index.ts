import "dotenv/config";

export const {
  PORT,
  SECRET_KEY,
  isDev,
  USER_EMAIL,
  USER_PASS,
  FE_URL,
  CLIENT_KEY,
  SERVER_KEY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = process.env;
