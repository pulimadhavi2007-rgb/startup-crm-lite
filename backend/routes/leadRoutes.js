import express from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
  searchLeads,
  updateLeadStatus,
} from "../controllers/leadController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================================
   Lead CRUD Routes
========================================================== */

// Create Lead
// POST /api/leads
router.post("/", protect, createLead);

// Get All Leads (Pagination + Filters + Search)
// GET /api/leads
router.get("/", protect, getLeads);

/* ==========================================================
   Analytics Routes
   IMPORTANT:
   Keep these ABOVE "/:id"
========================================================== */

// Dashboard Summary
// GET /api/leads/stats/summary
router.get("/stats/summary", protect, getLeadStats);

// Monthly Analytics
// GET /api/leads/stats/monthly
router.get("/stats/monthly", protect, getMonthlyStats);

/* ==========================================================
   Search Route
========================================================== */

// Search Leads
// GET /api/leads/search?q=rahul&limit=5
router.get("/search", protect, searchLeads);

/* ==========================================================
   Single Lead Routes
========================================================== */

// Get Single Lead
// GET /api/leads/:id
router.get("/:id", protect, getLeadById);

// Update Complete Lead
// PUT /api/leads/:id
router.put("/:id", protect, updateLead);

// Update Only Lead Status
// PATCH /api/leads/:id/status
router.patch("/:id/status", protect, updateLeadStatus);

// Delete Lead
// DELETE /api/leads/:id
router.delete("/:id", protect, deleteLead);

export default router;