import { response } from "express";
import { Job } from "../models/job.model.js";

export const postJob = async (request, respnse) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
      experienceLevel,
    } = request.body;
    const userId = request.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return response.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      location,
      jobType,
      experienceLevel,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return response.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (request, response) => {
  try {
    const keyword = request.query.keyword;
    // to search in mongo for keyword and i is to ignore case
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query);
    if (!jobs) {
      return response.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return response.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (request, response) => {
  try {
    const jobId = request.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return response.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return response.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobByAdmin = async (request, response) => {
  try {
    const adminId = request.id;
    // each admin gets a specific id for the job that admin creates
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 }); // -1 descending, 1 ascending
    if (!jobs) {
      return response.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return response.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
