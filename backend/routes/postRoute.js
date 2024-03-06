const router = require("express").Router()

const { createPostCntr, getAllPostCntr, getSingelPostCntr, getPostCountCntr, deletePostCntr, updatePostCntr, updateImageCntr, toggleLikeCntr } = require("../controlers/postControllers")
const photoUplaod = require("../midalwares/photoUpLoad");
const { validateObjectId } = require("../midalwares/validateObjectId");
const { verifyToken } = require("../midalwares/verifyToken")



router.route("/")
                .post(verifyToken,photoUplaod.single("image"),createPostCntr)
                .get(getAllPostCntr);


router.route("/count").get(getPostCountCntr);


router.route("/update_image/:id")
        .put(validateObjectId,verifyToken,photoUplaod.single("image"),updateImageCntr);

router.route("/likes/:id").put(validateObjectId,verifyToken,toggleLikeCntr);

router.route("/:id").get(validateObjectId,getSingelPostCntr)
                    .delete(validateObjectId,verifyToken,deletePostCntr)
                    .put(validateObjectId,verifyToken,updatePostCntr);



module.exports = router;
