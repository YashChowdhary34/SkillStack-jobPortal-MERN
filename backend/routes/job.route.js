import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  getAllJobs,
  getJobByAdmin,
  getJobById,
  postJob,
} from "../controllers/job.controller";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobByAdmin);
router.route("/get/:id").post(isAuthenticated, getJobById);

export default router;
