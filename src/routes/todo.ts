import express from "express"
import { authMiddleware } from "../middleware/authMiddlware"
import { addTodo } from "../controllers/todos/addTodo"
import { viewTodos } from "../controllers/todos/viewTodos"
import { deleteTodo } from "../controllers/todos/deleteTodo"
import { updateTodo } from "../controllers/todos/updateTodo"

const router = express.Router()

router.get("/view",authMiddleware,viewTodos)
router.post("/add",authMiddleware,addTodo)
router.delete("/delete/:id",authMiddleware,deleteTodo)
router.put("/update/:id",authMiddleware,updateTodo)

export default router
