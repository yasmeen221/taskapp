"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addProduct, updateProduct } from "@/app/redux/productSlice";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  quantity: yup
    .string()
    .required("Quantity is required")
    .matches(/^\d+$/, "Quantity must be a positive integer"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d*\.?\d+$/, "Price must be a positive number"),
});

const ProductForm = ({ existingProduct, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingProduct) {
      reset(existingProduct);
    } else {
      reset({ name: "", quantity: "", price: "" });
    }
  }, [existingProduct, reset]);

  const onSubmit = (data) => {
    if (existingProduct) {
      dispatch(updateProduct({ id: existingProduct.id, ...data }));
    } else {
      dispatch(addProduct({ id: Date.now(), ...data }));
      reset();
    }
    onSave();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="   max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5 mt-10"
      >
        <div className="mb-1">
          <label htmlFor="name" className="block mb-2 text-sm font-medium ">
            Name
          </label>
          <input
            {...register("name")}
            type="name"
            id="name"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="mb-1">
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium ">
            Quantity
          </label>
          <input
            {...register("quantity")}
            type="number"
            id="quantity"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your quantity"
          />
          <p className="text-sm text-red-500">{errors.quantity?.message}</p>
        </div>

        <div className="mb-1">
          <label htmlFor="price" className="block mb-2 text-sm font-medium ">
            Price
          </label>
          <input
            {...register("price")}
            type="number"
            id="price"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your price"
          />
          <p className="text-sm  text-red-500">{errors.price?.message}</p>
        </div>

        <button
          type="submit"
          className="text-white h-[40px] mt-2 px-7 bg-[#26B7CD] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm    text-center "
        >
          {existingProduct ? "Update" : "Add"} Product
        </button>
      </form>
      <hr></hr>
    </>
  );
};

export default ProductForm;
