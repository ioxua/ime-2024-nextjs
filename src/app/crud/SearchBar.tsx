'use client'

import { createTodo } from "./actions";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter()
  const create = async (formData: FormData) => {
    await createTodo(formData)
    router.refresh()
  }
  return (
    <form action={create} className="flex">
      <input
        type="name"
        name="todo-name"
        placeholder="Digite sua tarefa"
        className="bg-inherit p-1 border border-spacing-2 border-slate-200 rounded-md flex-grow "
      />
      <input
        type="submit"
        value="+"
        className="p-2 bg-green-200 text-black rounded-md w-8 ml-2 hover:bg-green-300"
      />
    </form>
  );
}
