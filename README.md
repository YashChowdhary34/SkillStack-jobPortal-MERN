# SkillStack - A Personalised Job Portal for Developers

<div align="center">
    <img src="https://github.com/user-attachments/assets/0bcf9782-3af7-4367-b253-449f50a6ddd9" alt="SkillStack Logo" height="300" width="300">
</div>

## Overview

SkillStack is an innovative job portal tailored specifically for developers. Our platform connects talented developers with top-tier companies, streamlining the recruitment process and fostering a community of tech professionals.

## Technologies Used

SkillStack is built using the MERN stack, chosen for its efficiency in developing dynamic web applications:

- **MongoDB**: A NoSQL database that allows for flexible, scalable data storage, ideal for handling complex job listings and user profiles.
- **Express.js**: A minimalistic web application framework for Node.js, facilitating robust API development and server-side logic.
- **React.js**: A powerful front-end library for building responsive and interactive user interfaces, enhancing user experience.
- **Node.js**: A JavaScript runtime that enables server-side scripting, allowing for a unified language across the stack and efficient handling of asynchronous operations.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Implemented Features](#implemented-features)
  - [Features in Progress](#features-in-progress)
  - [Planned Features](#planned-features)
- [Backend](#backend)
  - [User Authentication](#user-authentication)
  - [Job Management](#job-management)
  - [Application Tracking](#application-tracking)
  - [Database Schemas](#database-schemas)
- [Frontend](#frontend)
  - [User Interface](#user-interface)
  - [Current Progress](#current-progress)
  - [Future Enhancements](#future-enhancements)
- [Conclusion](#conclusion)
- [Repository and Contribution](#repository-and-contribution)

## Introduction

In the rapidly evolving tech industry, connecting skilled developers with the right opportunities is crucial. SkillStack aims to bridge this gap by providing a platform where developers can find jobs that match their skills, and companies can discover talent that fits their needs.

## Features

### Implemented Features

- User authentication and authorization (JWT-based).
- Role-based access control for developers and recruiters.
- Job creation, modification, and deletion by recruiters.
- Developers can browse and apply for jobs.
- Application tracking, allowing developers to monitor the status of their submissions.

### Features in Progress

- Advanced job search with filtering and sorting options.
- A recruiter dashboard to manage job postings and applications.
- A developer dashboard with personalized recommendations.

### Planned Features

- Integration of AI-driven job matching for developers.
- Detailed analytics for recruiters to assess application trends.
- Notification system for updates on job postings and applications.
- Social features like endorsements, recommendations, and networking opportunities.

## Backend

The backend of SkillStack is designed to handle various functionalities essential for a job portal. Below is an in-depth look at each component:

### User Authentication

We implemented a robust authentication system to ensure secure access:

- **Registration**: Users can create accounts as either developers or recruiters.
- **Login**: Authenticated using JSON Web Tokens (JWT) to maintain secure sessions.
- **Authorization**: Middleware functions check user roles to grant appropriate access to resources.

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
```

### Job Management

Recruiters can manage job postings through the following features:

- **Create Job**: Add new job listings with detailed descriptions and requirements.
- **Update Job**: Modify existing job postings as needed.
- **Delete Job**: Remove job listings that are no longer active.
- **View Applications**: Review applications submitted by developers.

```javascript
const express = require('express');
const router = express.Router();
const { Job } = require('../models/Job');

router.post('/create', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements,
    recruiter: req.user._id,
  });

  try {
    const savedJob = await job.save();
    res.status(201).send(savedJob);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
```

### Application Tracking

Developers can apply for jobs and track their application status:

- **Apply for Job**: Submit applications to desired job postings.
- **View Application Status**: Monitor the progress of submitted applications (e.g., pending, reviewed, accepted).

```javascript
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application };
```

### Database Schemas

The MongoDB database is structured to efficiently manage users, jobs, and applications. Key schemas include:

- **User Schema**: Stores user information, including role (developer or recruiter), contact details, and hashed passwords.
- **Job Schema**: Contains job details such as title, description, requirements, and the recruiter who posted it.
- **Application Schema**: Tracks applications submitted by developers, linking them to both the job and the applicant, along with the current status.

## Frontend

The frontend of SkillStack is designed to provide an intuitive and responsive user experience.

### User Interface

- **Job Listings**: A dynamic job feed tailored to developers' preferences.
- **Forms and Modals**: User-friendly forms for registration, job creation, and application submission.
- **Responsiveness**: Optimized for seamless use across devices, ensuring accessibility on mobile, tablet, and desktop.

### Current Progress

- **Authentication**: Login and registration forms integrated with the backend.
- **Job Browsing**: A functional interface for developers to view available job postings.
- **Role-based Views**: Separate pages for developers and recruiters, tailored to their respective roles.

### Future Enhancements

- **Developer Dashboard**: Personalized insights, including saved jobs, application tracking, and tailored job recommendations.
- **Recruiter Dashboard**: Tools for managing job postings and viewing application trends with analytics.
- **Advanced Search**: Filters based on skill sets, location, and salary ranges.
- **Interactive Elements**: Enhanced UI features like drag-and-drop for job management and real-time updates for applications.
- **Analytics and Visualizations**: Interactive charts and graphs to help recruiters analyze hiring trends and applicant data.

## Conclusion

SkillStack is a step forward in revolutionizing the job search experience for developers. By providing a robust backend, an intuitive and user-focused interface, and a roadmap filled with innovative features, this platform aims to redefine how developers and companies connect.

We invite developers and recruiters to join us in shaping the future of tech recruitment. Together, we can build a thriving community of talent and opportunity.

## Repository and Contribution

Feel free to fork the repository, make your changes, and submit a pull request. We welcome contributions of all kinds, whether it's fixing bugs, enhancing features, or improving the documentation.

Happy coding! 🚀
