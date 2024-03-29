var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const postsController = require("../controllers/posts.controller");

router.post("/", authMiddleware.loginRequired, postsController.create);
router.get("/:id", postsController.read);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.destroy);
router.get("/", postsController.getHomPagePosts);

router.post(
  "/:id/comments", authMiddleware.loginRequired,postsController.createComment
);
router.post("/:id/reactions",authMiddleware.loginRequired, postsController.createReaction
);



module.exports = router;