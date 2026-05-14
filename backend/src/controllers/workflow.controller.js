const {
  getAllWorkflows,
  getWorkflowById,
  createWorkflow,
  updateWorkflowContent,
  deleteWorkflow,
} = require("../services/workflow.service");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * GET /api/v1/workflows
 * Returns all non-archived workflows.
 *
 * TODO (future PR): Add pagination, filtering, sorting query params
 */
const getAll = async (req, res, next) => {
  try {
    const workflows = await getAllWorkflows();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Workflows fetched successfully",
      data: workflows,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/workflows/:id
 * Returns a single workflow by its ID.
 */
const getById = async (req, res, next) => {
  try {
    const workflow = await getWorkflowById(req.params.id);

    if (!workflow || workflow.isArchived) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Workflow not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Workflow fetched successfully",
      data: workflow,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/workflows
 * Creates a new workflow. Requires authentication (req.user set by protect middleware).
 *
 * TODO (future PR): Add request body validation
 */
const create = async (req, res, next) => {
  try {
    const workflow = await createWorkflow(req.body, req.user._id);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Workflow created successfully",
      data: workflow,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/v1/workflows/:id/content
 * Updates only the yamlContent field of a workflow.
 * Separate from a full update to enforce intentional YAML changes.
 *
 * TODO (future PR): Add ownership check
 */
const updateContent = async (req, res, next) => {
  try {
    const { yamlContent } = req.body;
    const workflow = await updateWorkflowContent(req.params.id, yamlContent);

    if (!workflow) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Workflow not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Workflow content updated successfully",
      data: workflow,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/workflows/:id
 * Soft-deletes a workflow by archiving it (isArchived = true).
 *
 * TODO (future PR): Add ownership check (only creator or admin)
 */
const remove = async (req, res, next) => {
  try {
    const workflow = await deleteWorkflow(req.params.id);

    if (!workflow) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Workflow not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Workflow archived successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, updateContent, remove };
