import { Request, Response, NextFunction } from "express";
import Products from "../models/Products";
import CustomError from "../utils/customError";
import { HttpStatus } from "../types/HttpStatus";

/**
 * * METHOD: GET
 * * Get all products
 */
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, category } = req.query as unknown as {
      page: number;
      category: string;
    };
    const currPage = +page || 1;
    const limit = 1;
    const skip = limit * (currPage - 1);

    const filter: Record<string, string> = {};
    if (category) filter.category = category;

    const products = await Products.find(filter).skip(skip).limit(limit);
    const totalPages = await Products.countDocuments();
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Products fetched successfully",
      products,
      totalPages,
      limit,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD: GET
 * * Get single product
 */
const singleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD: post
 * * add new product
 */
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const regex = new RegExp(name, "i");
    const isProductExist = await Products.findOne({ name: regex });
    if (isProductExist) {
      return next(
        new CustomError("Product already exists", HttpStatus.BAD_REQUEST)
      );
    }
    const newProduct = await Products.create(req.body);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export { getProducts, singleProduct, createProduct };
