"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

type ProductData = z.infer<typeof ProductData2 >

const ProductData2 = z.object({
	nameProduct: z.string(),
  priceProduct: z.number()
})

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductData>({
		resolver:zodResolver(ProductData2)
	})


  const onSubmit = handleSubmit((data) =>
    setProducts((prevProducts) => [...prevProducts, data])
  );

  return (
    <>
      <div className="h-min-screen flex flex-col items-center justify-center">
        <form
          className="flex flex-col gap-3 p-8 m-32 border"
          onSubmit={onSubmit}
        >
          <h2 className="flex justify-center items-center font-extrabold text-3xl text-blue-300">
            Cadastro de Produtos
          </h2>
          <label className="text-blue-500">Nome do Produto</label>
          <input
            {...register("nameProduct")}
            className="p-2 border border-black"
            type="text"
          />
          <label className="text-blue-500">Preço do Produto</label>
          <input
            {...register("priceProduct")}
            className="p-2 border border-black"
            type="number"
          />
          <button
            className="p-2 border border-black text-blue-500 hover:bg-slate-300 hover:text-blue-700 hover:border-2"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>


			<h2 className="font-extrabold text-3xl text-blue-300 pb-4 flex items-center justify-center">
          Lista de Produtos
      </h2>
      <div className="flex items-center justify-center">
        {products.map((product, index) => (
          <ul key={index} className="w-64 p-4">
            <li className="flex flex-col gap-3 p-2 border">
              <strong className="flex justify-center items-center">
                {product.nameProduct}
              </strong>
              R$ {product.priceProduct}
              <button className="p-1 border border-black text-blue-500">
                Excluir
              </button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
