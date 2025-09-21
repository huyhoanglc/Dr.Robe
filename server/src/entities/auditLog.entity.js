import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  action: { type: String, required: true }, 
  details: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
