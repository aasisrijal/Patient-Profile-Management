import { Router } from "express";

import * as authController from "./controllers/auth";
import * as userController from "./controllers/user";
import * as patientController from "./controllers/patients";
import { authenticate } from "./middlewares/auth";

const router = Router();

// Auth routes
router.post("/auth/refresh", authController.refresh);

// Signup route
router.post("/signup", userController.signup);

// Login route
router.post("/signin", userController.signin);

router.get("/users", userController.allUsers);

// Patients route
router.get("/patients", authenticate, patientController.allPatients);
router.post("/patients", authenticate, patientController.create);
router.put("/patients/:id", authenticate, patientController.updatePatient);

export default router;
