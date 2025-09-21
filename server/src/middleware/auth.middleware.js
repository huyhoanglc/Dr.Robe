import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "missing-token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "invalid-token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS512"], 
    });
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
