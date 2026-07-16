import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Meeting Scheduled",
        "Proposal Sent",
        "Won",
        "Lost",
      ],
      default: "New",
    },

    source: {
      type: String,
      enum: [
        "Website",
        "Referral",
        "LinkedIn",
        "Cold Call",
        "Email Campaign",
        "Other",
      ],
      default: "Website",
    },

    value: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
leadSchema.index({ owner: 1, status: 1 });
leadSchema.index({ owner: 1, source: 1 });
leadSchema.index({ owner: 1, createdAt: -1 });
leadSchema.index({ name: "text", company: "text", email: "text" });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead; 
