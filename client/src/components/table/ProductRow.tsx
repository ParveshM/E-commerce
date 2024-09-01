import { ProductType } from "@/types";

type ProductRowProps = {} & ProductType;

const ProductRow: React.FC<ProductRowProps> = ({
  name,
  images,
  category,
  price,
  stock,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td>
        <img
          className="pl-2 size-20 object-cover rounded-md shadow-lg"
          src={images[0]}
          alt={name}
        />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">₹{price}</td>
      <td className="px-6 py-4">{stock}</td>
      {/* <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td> */}
    </tr>
  );
};

export default ProductRow;
