const {
  getUsers,
  getRecentSearch,
  addSearch,
  allSearches,
} = require("../controller/users");
const { verifyJWT } = require("../middleware/verifyJWT");
const router = require("express").Router();

router.get("/", verifyJWT, getUsers);
router.get("/recent-search", verifyJWT, getRecentSearch);
router.post("/recent-search", verifyJWT, addSearch);
router.get("/all-searches", allSearches);

module.exports = router;
