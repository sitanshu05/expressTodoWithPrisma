import express from "express"
import authRoutes from "./auth"
import todoRoutes from "./todo"
const router = express.Router()

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}
router.use("/auth", authRoutes)
router.use("/todo",todoRoutes)


export default router