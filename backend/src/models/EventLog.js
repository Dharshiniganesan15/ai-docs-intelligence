import mongoose from 'mongoose';

const EventLogSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true, index: true },
    repository: { type: String, required: true, index: true },
    owner: { type: String, required: true, index: true },

    commitSha: { type: String },
    prNumber: { type: Number },
    releaseTag: { type: String },

    actor: { type: String },
    timestamp: { type: Date },

    status: { type: String, required: true, enum: ['received', 'processed', 'failed'], index: true },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const EventLog = mongoose.model('EventLog', EventLogSchema);
