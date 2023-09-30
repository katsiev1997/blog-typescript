import {Router} from 'express'
import authCtrl from '../controllers/authCtrl.js'

const authRouter = Router()

authRouter.post('/signup', authCtrl.signup)
authRouter.post('/login', authCtrl.login)
authRouter.get('/refreshToken', authCtrl.refreshToken)
authRouter.get('/logout', authCtrl.logout)

export default authRouter