import AddProduct from "@/components/dialogue/AddProduct";
import Paginate from "@/components/Pagination";
import ProductRow from "@/components/table/ProductRow";
import { Button } from "@/components/ui/button";
import { BASE_URL, productColumns } from "@/constants";
import { ProductType } from "@/types";
import showToast from "@/utils/toaster";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);
  useEffect(() => {
    axios
      .get(BASE_URL + "/products", { params: { page } })
      .then(({ data }) => {
        const { products, totalPages, limit } = data;
        setProducts(products);
        setTotalPages(totalPages);
        setItemsPerPage(limit);
      })
      .catch((err) => showToast(err.message, "error"));
  }, [page]);

  const handleNewProduct = (newProduct: ProductType) => {
    setProducts((prev) => [newProduct, ...prev]);
    setIsAddProductModalVisible(false);
  };

  const onPageChange = useCallback((page: number) => setPage(page), []);

  return (
    <div className="py-10 md:py-20 space-y-6">
      <div className="flex justify-between px-5">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button onClick={() => setIsAddProductModalVisible(true)}>
          Add Product
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {productColumns.map((col, index) => (
                <th scope="col" className="px-6 py-3" key={index}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products && products.length ? (
              products.map((product) => (
                <ProductRow {...product} key={product._id} />
              ))
            ) : (
              <tr>
                <td className="text-lg">No Products</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isAddProductModalVisible && (
        <AddProduct
          setShow={() => setIsAddProductModalVisible(false)}
          handleNewProduct={handleNewProduct}
        />
      )}
      <Paginate
        onPageChange={onPageChange}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Dashboard;
