import jwt from "jsonwebtoken";

/**
 * Generate a signed JWT and set it as an HTTP-only cookie on the response.
 * @param {Object} res        - Express response object
 * @param {string} userId     - MongoDB user _id
 * @param {string} role       - User role (user | seller | admin)
 */
const generateTokenAndSetCookie = (res, userId, role) => {
  const token = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,               // Not accessible via JS (prevents XSS)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict",           // Prevents CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  return token;
};

export default generateTokenAndSetCookie;
