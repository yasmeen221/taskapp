"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null);
  const handleSave = () => {
    setEditingProduct(null);
  };

  return (
    <>
      <div className="relative overflow-x-auto  mt-10  px-[150px]   ">
        <ProductForm existingProduct={editingProduct} onSave={handleSave} />
        <table className="w-full text-sm text-left mt-10 px-[100px]   container  ">
          <thead className="text-xs  uppercase   ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-10 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <>
                <tr key={product.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.price}</td>

                  <td className="pl-10 py-4">
                    <button
                      className="  border border-gray-300  mr-1 rounded-lg text-sm px-5 py-2.5 "
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="border border-gray-300  bg-red-500  text-white  rounded-lg text-sm px-5 py-2.5"
                      onClick={() => dispatch(deleteProduct(product.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>

  );
};

export default ProductList;
