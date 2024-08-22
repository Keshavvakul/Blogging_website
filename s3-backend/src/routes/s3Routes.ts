import express from "express";
import verifyJwt from "../middlewares/auth";
import { generatePutUrl, generateGetUrl } from "../controllers/s3Controller";

const router = express.Router();

console.log("Registering s3Routes...");

// Routes to handel pre-signed URL requests;

router.post("/presigned-url/put", verifyJwt, generatePutUrl);
router.post("/presigned-url/get", verifyJwt, generateGetUrl);

export default router;