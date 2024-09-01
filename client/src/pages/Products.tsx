import Paginate from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { BASE_URL, categories } from "@/constants";
import { ProductType } from "@/types";
import showToast from "@/utils/toaster";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<string | null>("");

  useEffect(() => {
    axios
      .get(BASE_URL + "/products", {
        params: { page },
      })
      .then(({ data }) => {
        const { products, totalPages, limit } = data;
        setProducts(products);
        setTotalPages(totalPages);
        setItemsPerPage(limit);
      })
      .catch((err) => showToast(err.message, "error"));
  }, [page]);

  const onPageChange = useCallback((page: number) => setPage(page), []);

  return (
    <div className="flex flex-col py-3 md:py-14 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8">
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <nav className="grid gap-2">
            <Button
              variant={!selectedCategory ? "default" : "ghost"}
              onClick={() => setSelectedCategory(null)}
              className="justify-start"
            >
              All
            </Button>
            {categories.map((category, i) => (
              <Button
                key={i}
                variant={
                  selectedCategory === category.name ? "default" : "ghost"
                }
                onClick={() => setSelectedCategory(category.name)}
                className="justify-start"
              >
                {category.name}
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-background rounded-lg shadow-sm overflow-hidden p-3"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="rounded-t h-52 w-full object-cover"
                />
                <div className="p-4 ">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary font-semibold mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button size="sm" className="w-full">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Paginate
            onPageChange={onPageChange}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
