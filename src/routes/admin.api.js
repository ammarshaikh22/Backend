import { Router } from "express";
import { approveUser, deleteUser, getAllUsers, getPendingUsers, rejectUser, updateUserRole } from "../controllers/admin.js";
import { adminMiddleware } from "../middleware/adminmiddileware.js";

const Adminrouter = Router();

Adminrouter.get("/getusers", getAllUsers);
Adminrouter.get("/getpendingusers", getPendingUsers);
Adminrouter.put("/approveuser/:id", adminMiddleware, approveUser);
Adminrouter.put("/updateuserrole/:id", adminMiddleware, updateUserRole);
Adminrouter.put("/rejectuser/:id", adminMiddleware, rejectUser);
Adminrouter.delete("/deleteuser/:id", adminMiddleware, deleteUser);



export default Adminrouter;