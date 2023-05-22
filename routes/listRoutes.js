const router=require("express").Router()
const { list_get ,list_post,item_get,item_patch,iteme_delete} = require("../controllers/listControllers")


router.route("/").get(list_get).post(list_post)
router.route("/:id").get(item_get).patch(item_patch).delete(iteme_delete)

module.exports=router