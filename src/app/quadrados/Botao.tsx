interface BotaoParams {
  texto: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Botao(params: BotaoParams) {
  return (
    <button
      className="rounded-md bg-indigo-600 px-3 py-2 disabled:bg-slate-400"
      onClick={params.onClick}
      disabled={params.disabled}
    >
      {params.texto}
    </button>
  );
}
