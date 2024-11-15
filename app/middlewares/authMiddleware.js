const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["authorization"]; // Use lowercase "authorization"
  console.log("Token from headers:", token);

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  // Split the token and ensure correct assignment
  token = token.split(" ")[1];

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  });
};
