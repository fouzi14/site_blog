
const router = require("express").Router()
const { createCategoryCntr, getAllCategoryCntr, deleteCategoryCntr } = require("../controlers/categoryControllers");
const { validateObjectId } = require("../midalwares/validateObjectId");
const { verifyTokenAndAdmin } = require("../midalwares/verifyToken")
 

router.route("/")
.post(verifyTokenAndAdmin,createCategoryCntr)
.get(getAllCategoryCntr);

router.route("/:id")
.delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryCntr);
module.exports = router;