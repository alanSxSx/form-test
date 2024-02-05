"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(0),
});

interface submittedData {
  name: "string";
  age: "number";
}

export const Formulario = () => {
  const [submittedData, setSubmittedData] =
    useState<Array<submittedData> | null>(null);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: any) {
    console.log(data);
    setSubmittedData((prevSubmittedData) => {
      // Use o spread operator para criar uma nova array adicionando o novo dado
      return prevSubmittedData ? [...prevSubmittedData, data] : [data];
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-3 m-16"
      >
        <input {...register("name")} className="border" />

        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="border"
        />

        <input type="submit" className="border px-2" />
      </form>
      {submittedData?.map((data, index) => (
        <div key={index}>
          <p>Nome: {data.name}</p>
          <p>Idade: {data.age}</p>
        </div>
      ))}
    </>
  );
};
