import { Router } from "express";
import { login, logout, Signup_as_student, Signup_as_teacher, uploadProfilePic, verifyEmail } from "../controllers/auth.js";
import upload from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const Authrouter = Router();

Authrouter.post('/signupstudent', Signup_as_student)
Authrouter.post('/verifyemail', verifyEmail)
Authrouter.post('/signupteacher', Signup_as_teacher)
Authrouter.post('/login', login)
Authrouter.post('/logout', logout)
Authrouter.post('/upload-profile',authMiddleware, upload.single('profile'), uploadProfilePic);

export default Authrouter;