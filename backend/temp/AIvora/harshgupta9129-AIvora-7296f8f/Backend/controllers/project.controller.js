import  projectModel from '../models/project.model.js';
import * as projectService from '../services/project.services.js';
import userModel from '../models/user.model.js';
import { validationResult } from 'express-validator';


export const createProject = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({ name, userId });

        res.status(201).json(newProject);

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }



}

export const getAllProject = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUserProjects = await projectService.getAllProjectByUserId({
            userId: loggedInUser._id
        })

        return res.status(200).json({
            projects: allUserProjects
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

export const addUserToProject = async (req, res) => {
    

    const errors = validationResult(req);
    console.log("REQ.BODY:", req.body);
    console.log("projectId:", req.body.projectId);
    console.log("users:", req.body.users);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, users } = req.body

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })


        const project = await projectService.addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        })

        return res.status(200).json({
            project,
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }


}

export const getProjectById = async (req, res) => {

    const { projectId } = req.params;

    try {

        const project = await projectService.getProjectById({ projectId });

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}

export const updateFileTree = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, fileTree } = req.body;

        const project = await projectService.updateFileTree({
            projectId,
            fileTree
        })

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}

// ✅ Exit Project Controller (Safe + Error-handled)
export const exitProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // 🛡 Ensure req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: user not found in request" });
    }

    const userId = req.user._id;

    // 🛡 Check if project exists
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🛡 Ensure project.users exists and is an array
    if (!Array.isArray(project.users)) {
      return res.status(400).json({ message: "Invalid project data: users list missing" });
    }

    // Check if user is part of this project
    const isMember = project.users.some(
      (u) => u && u.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({ message: "You are not a collaborator of this project" });
    }

    //  Remove user from collaborators safely
    project.users = project.users.filter(
      (u) => u && u.toString() !== userId.toString()
    );

    await project.save();

    return res.status(200).json({ message: "Exited project successfully" });
  } catch (error) {
    console.error("Error exiting project:", error);
    return res.status(500).json({ message: error.message || "Server error while exiting project" });
  }
};
