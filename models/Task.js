const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: String,
  text: String,
  date: Date,
});

const HistoryLogSchema = new mongoose.Schema({
  field: String,
  oldValue: String,
  newValue: String,
  updatedBy: String,
  updatedAt: Date,
});

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO',
    },
    dueDate: { type: Date },

    // Extra fields
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
    tags: [{ type: String }],
    category: { type: String },
    estimatedHours: { type: Number },
    actualHours: { type: Number },
    progress: { type: Number, min: 0, max: 100 },
    attachments: [{ type: String }],
    createdBy: { type: String },
    assignedTo: { type: String },
    reviewer: { type: String },
    team: [{ type: String }],
    completedAt: { type: Date },
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: { type: String },

    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

    comments: [CommentSchema],
    historyLog: [HistoryLogSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
