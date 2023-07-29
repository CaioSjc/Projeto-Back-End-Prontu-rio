import { Router } from "express";
import { userRouter } from "./userRoute";
import { authRouter } from "./authRoute";
import { patientRouter } from "./patientRoute";
import { timelinesRouter } from "./timelinesRoute"
import { ocurrencesRouter } from "./ocurrencesRoute"
import { CheckAuthorization} from "../common/middlewares/ensureAuthenticate"

export const router = Router()

router.use( '/auth', authRouter )
router.use( '/users', userRouter )
router.use(CheckAuthorization.execute)
router.use( '/patients', patientRouter )
router.use( '/timelines', timelinesRouter )
router.use( '/ocurrences', ocurrencesRouter)
