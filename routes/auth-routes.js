const { Router } = require("express");
const { check } = require("express-validator");
const registerController = require("../controllers/AuthControllers/register.controller");
const loginController = require("../controllers/AuthControllers/login.controller");
const recoveryPasswordController = require("../controllers/AuthControllers/recoveryPassword.controller");
const confirmEmailController = require('../controllers/AuthControllers/confirmEmail.controller');
const logoutController = require("../controllers/AuthControllers/logout.controller");
const refreshTokenController = require("../controllers/AuthControllers/refreshTokenController");

const router = Router();

router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля - 6 символов").isLength({
      min: 6,
    }),
  ],
  registerController
);

router.post(
  "/login",
  [
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Минимальная длина пароля - 6 символов")
      .exists()
      .isLength({ min: 6 })
  ],
  loginController
);

router.post(
  "/recovery",
  [check("email", "Некорректный email").normalizeEmail().isEmail()],
  recoveryPasswordController
);

router.post('/confirm', [check("email", "Некорректный email").normalizeEmail().isEmail()], confirmEmailController)

router.get('/logout', logoutController)

router.get('/refresh', refreshTokenController)

module.exports = router;
