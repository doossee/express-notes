import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validateCreateNode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;

  if (title === undefined) {
    return next(new ApiError(400, "Title is required"));
  }
  if (typeof title !== "string") {
    return next(new ApiError(400, "Type is required"));
  }
  if (title.trim() === "") {
    return next(new ApiError(400, "Title cannot be empty"));
  }
  if (title.length > 200) {
    return next(new ApiError(400, "Title must be less than 200 characters"));
  }

  if (content === undefined) {
    return next(new ApiError(400, "Content is required"));
  }
  if (typeof content !== "string") {
    return next(new ApiError(400, "Content must be a string"));
  }
  if (content.trim() === "") {
    return next(new ApiError(400, "Content cannot be empty"));
  }
  if (content.length > 5000) {
    return next(new ApiError(400, "Content must be less than 5000 characters"));
  }

  req.body = {
    title: title.trim(),
    content: content.trim(),
  };

  next();
};

export const validateUpdateNode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;

  if (title === undefined && content === undefined) {
    return next(
      new ApiError(
        400,
        "At least one field (title or content) must be provided",
      ),
    );
  }

  if (title !== undefined) {
    if (typeof title !== "string") {
      return next(new ApiError(400, "Type is required"));
    }
    if (title.trim() === "") {
      return next(new ApiError(400, "Title cannot be empty"));
    }
    if (title.length > 200) {
      return next(new ApiError(400, "Title must be less than 200 characters"));
    }
    req.body.title = title.trim();
  }

  if (content === undefined) {
    if (typeof content !== "string") {
      return next(new ApiError(400, "Content must be a string"));
    }
    if (content.trim() === "") {
      return next(new ApiError(400, "Content cannot be empty"));
    }
    if (content.length > 5000) {
      return next(
        new ApiError(400, "Content must be less than 5000 characters"),
      );
    }
    req.body.content = content.trim();
  }

  next();
};

export const validateNodeId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!id) {
    return next(new ApiError(400, "Node ID is required"));
  }
  if (typeof id !== "string") {
    return next(new ApiError(400, "Node ID must be a string"));
  }
  if (id.trim() === "") {
    return next(new ApiError(400, "Node ID cannot be empty"));
  }
  if (!uuidRegex.test(id)) {
    return next(new ApiError(400, "Node ID must be a valid UUID"));
  }

  next();
};

export const validateListNodesQuery = (req: Request, res: Response, next: NextFunction) => {
  const { page, limit, search } = req.query;
  
  if (page !== undefined) {
    if (typeof page !== "string") {
      return next(new ApiError(400, "Page must be a string"));
    }
    const parsedPage = parseInt(page, 10);
    if (isNaN(parsedPage) || parsedPage < 1) {
      return next(new ApiError(400, "Page must be a positive integer"));
    }
  }
  
  if (limit !== undefined) {
    if (typeof limit !== "string") {
      return next(new ApiError(400, "Limit must be a string"));
    }
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
      return next(new ApiError(400, "Limit must be a positive integer between 1 and 100"));
    }
  }
  
  if (search !== undefined) {
    if (typeof search !== "string") {
      return next(new ApiError(400, "Search must be a string"));
    }
    req.query.search = search.trim() || undefined;
  }
  
  next();
};
