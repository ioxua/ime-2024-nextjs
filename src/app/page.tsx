interface Demo {
  href: string;
  nome: string;
}

const demos: Demo[] = [
  { href: "/quadrados", nome: "Quadrados!" },
  { href: "/crud", nome: "CRUD" },
];

export default function Home() {
  return (
    <>
      <ul className="list-disc">
        {demos.map((demo) => (
          <li key={demo.href} className="ml-4">
            <a
              href={demo.href}
              className="text-sky-500 hover:text-sky-400 hover:visited:text-indigo-300 visited:text-indigo-400 underline hover:underline-offset-4 transition-all"
            >
              {demo.nome}
            </a>
          </li>
        ))}
        <li></li>
      </ul>
    </>
  );
}
