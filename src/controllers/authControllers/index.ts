import register from "./register.controller";
import login from "./login.controller";
import logout from "./logout.controller";
import refresh from "./refresh.controller";
import emailVerification from "./emailVerification.controller";
import resetPassword from "./resetPassword.controller";

export const authController = {
  register,
  login,
  logout,
  refresh,
  emailVerification,
  resetPassword,
};
