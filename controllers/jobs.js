const Job = require("../models/jobSchema");
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const createJob = async (req, res) => {
    const user = req.user;
    req.body.createdBy = user.userId;
    const {company, position} = req.body;
    if(!company || !position)
        throw new BadRequestError("You Must Provide Company and position");
    const job = await Job.create({...req.body});
    return res.status(StatusCodes.CREATED).json({job});
}
const updateJob = async (req, res) => {
//     receive [company , position, status]
    const {company, position} = req.body;
    if (!company || !position) {
        throw new BadRequestError("Provide Some Information");
    }
    const {user: {userId}, params: {id: jobId}} = req;
    const job = await Job.findByIdAndUpdate({_id: jobId,createdBy: userId}, { ...req.body},{new:true,runValidators:true});
    if (!job) {
        throw new NotFoundError(`No Job with this ID ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({job});
}
const deleteJob = async (req, res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    } = req;
    const job = await Job.deleteOne({_id:jobId, createdBy: userId});
    if(!job.deletedCount)
        throw new BadRequestError(`No Job With ID ${jobId}`);
    return res.status(StatusCodes.OK);
}

const getJob = async (req, res)=> {
    const {
        user: {userId},
        params: {id: jobId},
    } = req;
    const job = await Job.findOne({_id: jobId, createdBy: userId});
    if (!job)
        throw new NotFoundError(`No Job With ID ${jobId} and User ID ${userId}`);
    return res.status(StatusCodes.OK).json({job});
}
const getAllJobs = async (req, res)=> {
    const user = req.user.userId;
    const jobs = await Job.find({createdBy: user}).sort("createdAt");
    return res.status(StatusCodes.OK).json({jobs,count: jobs.length});
}



module.exports = {createJob, updateJob, deleteJob, getJob, getAllJobs};