import Lead from "../models/Lead.js";
import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

/**
 * @route POST /api/leads
 * @desc Create Lead
 * @access Private
 */
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      owner: req.user._id,
    });

    return successResponse(
      res,
      "Lead created successfully",
      lead,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/**
 * @route GET /api/leads
 * @desc Get All Leads with Pagination, Filtering, Search & Sorting
 * @access Private
 */
export const getLeads = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Base Filter
    const filter = {
      owner: req.user._id,
    };

    // Status Filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Source Filter
    if (req.query.source) {
      filter.source = req.query.source;
    }

    // Date Filter
    if (req.query.dateFrom || req.query.dateTo) {
      filter.createdAt = {};

      if (req.query.dateFrom) {
        filter.createdAt.$gte = new Date(req.query.dateFrom);
      }

      if (req.query.dateTo) {
        filter.createdAt.$lte = new Date(req.query.dateTo);
      }
    }

    // Search Filter
    if (req.query.search) {
      const regex = new RegExp(req.query.search, "i");

      filter.$or = [
        { name: regex },
        { company: regex },
        { email: regex },
      ];
    }

    // Fetch Leads
    const leads = await Lead.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    // Count Total
    const total = await Lead.countDocuments(filter);

    const pages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
      pagination: {
        total,
        page,
        limit,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/**
 * @route GET /api/leads/:id
 * @desc Get Single Lead
 * @access Private
 */
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!lead) {
      return errorResponse(
        res,
        "Lead not found",
        [],
        404
      );
    }

    return successResponse(
      res,
      "Lead fetched successfully",
      lead
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/**
 * @route PUT /api/leads/:id
 * @desc Update Lead
 * @access Private
 */
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return errorResponse(
        res,
        "Lead not found",
        [],
        404
      );
    }

    return successResponse(
      res,
      "Lead updated successfully",
      lead
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/**
 * @route DELETE /api/leads/:id
 * @desc Delete Lead
 * @access Private
 */
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!lead) {
      return errorResponse(
        res,
        "Lead not found",
        [],
        404
      );
    }

    return successResponse(
      res,
      "Lead deleted successfully"
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
/**
 * @route GET /api/leads/stats/summary
 * @desc Get Lead Statistics
 * @access Private
 */
export const getLeadStats = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const now = new Date();

    const startOfThisMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    const [
      totalLeads,
      statusResult,
      sourceResult,
      wonLeads,
      thisMonthLeads,
      lastMonthLeads,
    ] = await Promise.all([

      Lead.countDocuments({
        owner: ownerId,
      }),

      Lead.aggregate([
        {
          $match: {
            owner: ownerId,
          },
        },
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]),

      Lead.aggregate([
        {
          $match: {
            owner: ownerId,
          },
        },
        {
          $group: {
            _id: "$source",
            count: {
              $sum: 1,
            },
          },
        },
      ]),

      Lead.countDocuments({
        owner: ownerId,
        status: "Won",
      }),

      Lead.countDocuments({
        owner: ownerId,
        createdAt: {
          $gte: startOfThisMonth,
        },
      }),

      Lead.countDocuments({
        owner: ownerId,
        createdAt: {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth,
        },
      }),

    ]);

    const statusBreakdown = {};

    statusResult.forEach((item) => {
      statusBreakdown[item._id] = item.count;
    });

    const sourceBreakdown = {};

    sourceResult.forEach((item) => {
      sourceBreakdown[item._id] = item.count;
    });

    const conversionRate =
      totalLeads === 0
        ? 0
        : Number(((wonLeads / totalLeads) * 100).toFixed(1));

    let growthRate = 0;

    if (lastMonthLeads > 0) {
      growthRate = Number(
        (
          ((thisMonthLeads - lastMonthLeads) /
            lastMonthLeads) *
          100
        ).toFixed(1)
      );
    } else if (thisMonthLeads > 0) {
      growthRate = 100;
    }

    return successResponse(
      res,
      "Lead statistics fetched successfully",
      {
        totalLeads,
        statusBreakdown,
        sourceBreakdown,
        conversionRate,
        thisMonthLeads,
        lastMonthLeads,
        growthRate,
      }
    );

  } catch (error) {
    return errorResponse(res, error.message);
  }
};
/**
 * @route GET /api/leads/stats/monthly
 * @desc Get Monthly Lead Statistics (Last 6 Months)
 * @access Private
 */
export const getMonthlyStats = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // Start from the first day of the month 5 months ago
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    startDate.setMonth(startDate.getMonth() - 5);

    // Aggregate monthly data
    const monthlyData = await Lead.aggregate([
      {
        $match: {
          owner: ownerId,
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
          won: {
            $sum: {
              $cond: [{ $eq: ["$status", "Won"] }, 1, 0],
            },
          },
          lost: {
            $sum: {
              $cond: [{ $eq: ["$status", "Lost"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Build the last 6 months with default values
    const result = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - i);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const existing = monthlyData.find(
        (item) =>
          item._id.year === year &&
          item._id.month === month
      );

      const total = existing?.total || 0;
      const won = existing?.won || 0;
      const lost = existing?.lost || 0;

      result.push({
        month: `${monthNames[month - 1]} ${year}`,
        total,
        won,
        lost,
        conversionRate:
          total === 0
            ? 0
            : Number(((won / total) * 100).toFixed(1)),
      });
    }

    return successResponse(
      res,
      "Monthly statistics fetched successfully",
      result
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
/**
 * @route   GET /api/leads/search
 * @desc    Search Leads (Autocomplete)
 * @access  Private
 */
export const searchLeads = async (req, res) => {
  try {
    const { q, limit = 5 } = req.query;

    // If no search query is provided
    if (!q) {
      return successResponse(res, "No search query", []);
    }

    const regex = new RegExp(q, "i");

    const leads = await Lead.find({
      owner: req.user._id,
      $or: [
        { name: regex },
        { company: regex },
        { email: regex },
      ],
    })
      .select("_id name company email status")
      .limit(Number(limit));

    return successResponse(
      res,
      "Search results fetched successfully",
      leads
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
/**
 * @route PATCH /api/leads/:id/status
 * @desc Update Lead Status
 * @access Private
 */
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return errorResponse(res, "Lead not found", [], 404);
    }

    return successResponse(
      res,
      "Lead status updated successfully",
      lead
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};