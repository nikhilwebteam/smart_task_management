const exrpess = require("express");
const router = exrpess.Router();
const { handleGetAllUsers } = require("../controllers/user.controller.js");

router.get("/", handleGetAllUsers);
module.exports = router;