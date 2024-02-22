"use client";

import Botao from "@/app/quadrados/Botao";
import Quadrado from "@/app/quadrados/Quadrado";
import { useState } from "react";

const colors = ["bg-red-700", "bg-yellow-500", "bg-red-300", "bg-blue-600", "bg-sky-200"];

/**
 * componente reac tmto legal
 * @returns 
 */
export default function Home() {
  const [count, setCount] = useState(2);

  const maisUm = () => {
    setCount(count + 1);
  };

  const menosUm = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div className="px-3 py-3 m-2 flex flex-row gap-2">
        <Botao
          texto="+1"
          onClick={maisUm}
          disabled={false}
        />
        <Botao
          texto="-1"
          onClick={menosUm}
          disabled={count <= 0}
        />
      </div>
      <div className="flex flex-row gap-3 flex-wrap">
        {[...Array(count)].map((_, n) => {
          return <Quadrado key={n} cor={colors[n % colors.length]} />;
        })}
      </div>
    </>
  );
}
