interface QuadradoParams {
  cor: string;
}

export default function Quadrado(params: QuadradoParams) {
  return <div className={`w-40 h-40 ${params.cor}`}></div>;
}
