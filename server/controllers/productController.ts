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
    const page = req.query.page || 1;
    const currPage = +page;
    const limit = 5;
    const skip = limit * (currPage - 1);
    const products = await Products.find().skip(skip).limit(limit);
    return res.json({
      success: true,
      message: "Products fetched successfully",
      products,
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
    return res.json({
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
    return res.json({
      success: true,
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export { getProducts, singleProduct, createProduct };
