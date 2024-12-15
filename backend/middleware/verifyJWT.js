const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // Retrieve the token from the session
  const token = req.session.user;
  console.log("Session Token:", token);

  // Check if token is available
  if (!token) {
    return res.status(401).json({ message: "access denied" });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log(decoded.UserInfo.email);
    req.email = decoded.UserInfo.email;

    next();
  });
};

module.exports = { verifyJWT };
