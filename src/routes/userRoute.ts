import { Router } from "express";
import { UserModule } from "../user/userModule";
import { UploadSingle } from "../common/middlewares/uploadMiddleware";
import { CheckAuthorization } from "../common/middlewares/ensureAuthenticate";

export const userRouter = Router()

const controller = UserModule.build().controller

const uploadSingle = UploadSingle.build("photo");

userRouter.post('/userCreate', uploadSingle, controller.create.bind(controller))

userRouter.use(CheckAuthorization.execute)
userRouter.put('/userUpdated/:id',  controller.updateUser.bind(controller))

userRouter.delete('/userDelete/:id',  controller.deleteUser.bind(controller))
  