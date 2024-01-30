import { Router } from "express";
import { getAllUsers, userSignUp } from "../controllers/userControllers.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', userSignUp);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map