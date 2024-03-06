const { createCommentCntr, getAllCommentCntr, deleteCommentCntr, updateCommentCntr } = require("../controlers/commentControllers");
const { validateObjectId } = require("../midalwares/validateObjectId");
const { verifyToken, verifyTokenAndAdmin } = require("../midalwares/verifyToken")

const router = require("express").Router()

router.route("/")
                .post(verifyToken,createCommentCntr)
                .get(verifyTokenAndAdmin,getAllCommentCntr);

router.route("/:id")
            .delete(validateObjectId,verifyToken,deleteCommentCntr)
            .put(validateObjectId,verifyToken,updateCommentCntr);


module.exports=router