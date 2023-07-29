import { Router } from "express";
import { AuthModule } from "../auth/authModule";

export const authRouter = Router()
const controller = AuthModule.build().controller

authRouter.post("/", (req, res) => {
  return controller.login(req, res)
})