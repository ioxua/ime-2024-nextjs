"use client";

import { Todo } from "@/services/todoService";
import { deleteTodo, toggleTodo } from "./actions";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: Todo;
}

export default function Todo({ todo: { id, done, name } }: TodoProps) {
  const router = useRouter()

  const toggle = async () => {
    await toggleTodo(id)
    router.refresh()
  }

  const sendDelete = async () => {
    await deleteTodo(id)
    router.refresh()
  }

  const onToggle = (e: any) => {
    'use client'
    console.log('evento:', e)
    e.target.form?.requestSubmit()
  }

  return (
    <div className="hover:bg-slate-800 flex rounded-md mt-3 items-center pl-1 py-1">
      <form action={toggle}>
        <input type="checkbox" checked={done} className="mr-1" onChange={onToggle} />
      </form>
      <span className={`${done ? "line-through text-slate-400" : ""}`}>
        {name}
      </span>

      <form action={sendDelete} className="ml-auto">
        <input type="submit" value="-" className="p-2 bg-red-200  text-black rounded-md w-8 hover:bg-red-300" />
      </form>
    </div>
  );
}
