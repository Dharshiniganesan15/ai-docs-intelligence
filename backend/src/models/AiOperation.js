import mongoose from 'mongoose';

const AiOperationSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true, index: true },
    repository: { type: String, required: true, index: true },
    owner: { type: String, required: true, index: true },

    commitSha: { type: String },
    prNumber: { type: Number },
    releaseTag: { type: String },

    actor: { type: String },

    status: { type: String, required: true, enum: ['success', 'failure'], index: true },
    errorMessage: { type: String },

    geminiModel: { type: String },
    promptType: { type: String, required: true, enum: ['doc_update', 'pr_summary', 'release_notes'] },
    inputSize: { type: Number },
    outputSize: { type: Number },

    startedAt: { type: Date, required: true },
    finishedAt: { type: Date, required: true },

    result: {
      documentationUpdate: { type: String },
      prSummary: { type: String },
      releaseNotes: { type: String }
    }
  },
  { timestamps: true }
);

export const AiOperation = mongoose.model('AiOperation', AiOperationSchema);
