const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createMeal,
  getAllMeals,
  getSingleMeal,
  updateMeal,
  deleteMeal,
  uploadImage,
} = require("../controllers/mealController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createMeal)
  .get(getAllMeals);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleMeal)
  .patch([authenticateUser, authorizePermissions("admin")], updateMeal)
  .delete([authenticateUser, authorizePermissions("admin")], deleteMeal);

module.exports = router;
