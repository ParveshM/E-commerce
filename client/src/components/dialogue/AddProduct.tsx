import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useFormik } from "formik";
import uploadImages from "@/api/uploadImages";
import { AddProductvalidationSchema } from "@/utils/validation";
import axiosJWT from "@/utils/axiosJWT";
import { BASE_URL } from "@/constants";
import showToast from "@/utils/toaster";
import { ProductType } from "@/types";
type ModalProps = {
  setShow: () => void;
  handleNewProduct: (newProduct: ProductType) => void;
};
const AddProduct: React.FC<ModalProps> = ({ setShow, handleNewProduct }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      images: [],
    },
    validationSchema: AddProductvalidationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axiosJWT
        .post(BASE_URL + "/products", values)
        .then(({ data }) => {
          handleNewProduct(data.newProduct);
          showToast("Product added successfully");
        })
        .catch((res) => showToast(res.data.message, "error"));
      console.log(values);
    },
  });
  return (
    <Dialog defaultOpen onOpenChange={setShow}>
      <DialogContent className="w-full max-h-96 overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new product.
          </DialogDescription>
        </DialogHeader>

        <form className="grid col-span-3 gap-6" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              placeholder="Enter product name"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the product"
              className="min-h-[85px]"
              {...formik.getFieldProps("description")}
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              {...formik.getFieldProps("price")}
            />
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500">{formik.errors.price}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter stock"
              {...formik.getFieldProps("stock")}
            />
            {formik.errors.stock && formik.touched.stock && (
              <p className="text-red-500">{formik.errors.stock}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(val) => formik.setFieldValue("category", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="toys">Toys</SelectItem>
                <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                <SelectItem value="sports">Sports & Outdoors</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              multiple
              onChange={async (e) => {
                setIsUploading(true);
                const urls = await uploadImages(
                  Array.from(e.currentTarget.files || [])
                );
                formik.setFieldValue("images", urls);
                setIsUploading(false);
              }}
            />
            {formik.errors.images && formik.touched.images ? (
              <p className="text-red-500">{formik.errors.images}</p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {formik.values.images.length
                ? formik.values.images.map((image, i) => (
                    <img
                      className="w-32 h-32 object-cover rounded-md shadow-lg"
                      src={image}
                      key={i}
                      alt={`Uploaded preview ${i + 1}`}
                    />
                  ))
                : null}
            </div>
          </div>

          <Button
            type="submit"
            className="ml-auto"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? "Submitting" : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddProduct;
