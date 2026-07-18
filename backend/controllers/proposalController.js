const Proposal = require("../models/Proposal");
const Job = require("../models/Job");
const logActivity = require("../utils/activityLogger");
const Notification = require("../models/Notification");

// Apply to a Job
const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter, bidAmount } = req.body;

    // Check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Prevent duplicate applications
    const existingProposal = await Proposal.findOne({
      job: jobId,
      freelancer: req.user.id,
    });

    if (existingProposal) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // Create proposal
    const proposal = await Proposal.create({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
      bidAmount,
    });
await logActivity(
  req.user.id,
  "PROPOSAL_SUBMITTED",
  `A proposal was submitted for job "${proposal.job}".`
);
    res.status(201).json({
      message: "Proposal Submitted Successfully",
      proposal,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get My Proposals
const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({
      freelancer: req.user.id,
    }).populate("job", "title budget status");

    res.json({
      count: proposals.length,
      proposals,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Proposals for a Specific Job
const getJobProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({
      job: req.params.jobId,
    }).populate("freelancer", "name email");

    res.json({
      count: proposals.length,
      proposals,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Proposal Status
const updateProposalStatus = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    proposal.status = req.body.status;
    await proposal.save();
    await logActivity(
  req.user.id,
  req.body.status === "Accepted"
    ? "PROPOSAL_ACCEPTED"
    : "PROPOSAL_REJECTED",
  `Proposal ${proposal._id} was ${req.body.status.toLowerCase()}.`
);
await Notification.create({
  receiver: proposal.freelancer,
  sender: req.user.id,
  title: `Proposal ${req.body.status}`,
  message:
    req.body.status === "Accepted"
      ? "Congratulations! Your proposal has been accepted."
      : "Your proposal has been rejected.",
});
    // If accepted, reject all other proposals for the same job
    if (req.body.status === "Accepted") {
      await Proposal.updateMany(
        {
          job: proposal.job,
          _id: { $ne: proposal._id },
        },
        {
          $set: {
            status: "Rejected",
          },
        }
      );
    }

    res.json({
      message: "Proposal Status Updated",
      proposal,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  applyToJob,
  getMyProposals,
  getJobProposals,
  updateProposalStatus,
};