const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};