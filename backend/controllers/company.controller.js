import { response } from "express";
import { Company } from "../models/company.model.js";

export const registerCompany = async (request, response) => {
  try {
    const { companyName } = request.body;
    if (!companyName) {
      return response.json({
        message: "Company name required",
        success: false,
      });
    }
    let company = await Company.findCompany({ name: companyName });
    if (company) {
      return response.json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: request.id,
    });

    // 201 register
    return response.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (request, response) => {
  try {
    //userid of user logged in
    const userId = request.id;
    const companies = await Company.findCompany({ userId });
    if (!companies) {
      return response.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (request, response) => {
  try {
    const companyId = request.params.id;
    const company = await Company.findById({ companyId });
    if (!companies) {
      return response.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return response.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (request, response) => {
  try {
    const { name, description, website, location } = request.body;
    const file = request.file;

    //cloudinary

    const updateList = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(
      request.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return response.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return response.status(200).json({
      message: "Company updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
