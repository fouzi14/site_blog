const router = require("express").Router()
const { getAllUsersCntr, getUsersCntr, updateUserCntr, getUsersCountCntr, profilPhotoUplaod ,deleteUserProfilCntr } = require("../controlers/usersControlers");
const photoUplaod = require("../midalwares/photoUpLoad");
const { validateObjectId } = require("../midalwares/validateObjectId");
const {  verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken, verifyTokenAndAuthorization} = require("../midalwares/verifyToken");


router.route("/profil").get(verifyTokenAndAdmin,getAllUsersCntr);

router.route("/profil/:id")
                        .get(validateObjectId,getUsersCntr)
                        .put(validateObjectId,verifyTokenAndOnlyUser,updateUserCntr)
                        .delete(validateObjectId,verifyTokenAndAuthorization,deleteUserProfilCntr);
router.route("/count").get(verifyToken,getUsersCountCntr);

router.route("/profil/photo-upload")
                    .post(verifyToken,photoUplaod.single("image"),profilPhotoUplaod);
module.exports = router;