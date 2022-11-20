import { Router } from "express";

import * as authController from "./controllers/auth";
import * as userController from "./controllers/user";
import * as patientController from "./controllers/patients";
import { authenticate } from "./middlewares/auth";
import { validate } from "./middlewares/validate";
import { userSchema } from "./schemas/userSchema";
import { patientSchema } from "./schemas/patientSchema";
import { checkSchema } from "express-validator";

const router = Router();

// Auth routes
router.post("/auth/refresh", authController.refresh);

// Signup route
router.post("/signup", validate(checkSchema(userSchema)), userController.signup);

// Login route
router.post("/signin", userController.signin);

router.get("/users", userController.allUsers);

// Patients route
router.get("/patients", authenticate, patientController.allPatients);
router.post("/patients", authenticate, validate(checkSchema(patientSchema)), patientController.create);
router.put("/patients/:id", authenticate, validate(checkSchema(patientSchema)), patientController.updatePatient);
router.delete("/patients/:id", authenticate, patientController.deletePatient);

export default router;
