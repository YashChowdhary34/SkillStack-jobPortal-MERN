import { Application } from "../models/application.model";
import { Job } from "../models/job.model";

export const applyJob = async (request, response) => {
  try {
    const userId = request.id;
    const jobId = request.params.id;
    if (!jobId) {
      return response.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    //check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (!existingApplication) {
      return response.status(400).json({
        message: "You have already applied for the job",
        success: false,
      });
    }
    // check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return response.status(400).json({
        message: "Job does not exist",
        success: false,
      });
    }
    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    Job.applications.push(newApplication.id);
    await Job.save();
    return response.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (request, response) => {
  try {
    const userId = request.id;
    const application = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      })
      .sort({ createdAt: -1 });
    if (!application) {
      return response.status(404).json({
        message: "No application found",
        success: false,
      });
    }
    return response.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (request, response) => {
  try {
    const jobId = request.params.id;
    const job = await Job.findById();
  } catch (error) {
    console.log(error);
  }
};
