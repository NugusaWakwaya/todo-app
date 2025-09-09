"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Fetch user + todos
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  // Add Todo
    async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/todos/user/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
    });
    const todo = await res.json();
    setUser((prev: any) => ({ ...prev, todos: [...prev.todos, todo] }));
    setNewTodo("");
    }
   function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/login";
    }


  // Toggle Complete
  async function toggleComplete(todoId: number, completed: boolean) {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated = await res.json();
    setUser((prev: any) => ({
      ...prev,
      todos: prev.todos.map((t: any) => (t.id === todoId ? updated : t)),
    }));
  }

  // Edit Todo
  function startEdit(todoId: number, title: string) {
    setEditingId(todoId);
    setEditText(title);
  }

  async function saveEdit(todoId: number) {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editText }),
    });
    const updated = await res.json();
    setUser((prev: any) => ({
      ...prev,
      todos: prev.todos.map((t: any) => (t.id === todoId ? updated : t)),
    }));
    setEditingId(null);
    setEditText("");
  }

  // Delete Todo
  async function deleteTodo(todoId: number) {
    await fetch(`/api/todos/${todoId}`, { method: "DELETE" });
    setUser((prev: any) => ({
      ...prev,
      todos: prev.todos.filter((t: any) => t.id !== todoId),
    }));
  }

  return (
   
    <main className="max-w-xl mx-auto p-6 bg-white shadow-md mt-8 rounded-lg">
       <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-2 items-center"> ✅ Todo App</h1>
        </div>

      </div>
  <h1 className="text-2xl font-bold mb-6 text-gray-800">{user.email}'s Profile</h1>

  {/* Add Todo */}
  <form onSubmit={addTodo} className="flex items-center gap-2 mb-6">
    <input
      type="text"
      placeholder="Add a new task..."
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
    >
      Add
    </button>
    <button
      onClick={logout}
      type="button"
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
    >
      Logout
    </button>
  </form>

  {/* Todos List */}
  <ul className="space-y-3">
    {user.todos.map((todo: any) => (
      <li
        key={todo.id}
        className="flex items-center justify-between bg-gray-50 border rounded px-3 py-2 shadow-sm"
      >
        {editingId === todo.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border border-gray-300 p-2 rounded flex-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <span
            onClick={() => toggleComplete(todo.id, todo.completed)}
            className={`cursor-pointer flex-1 ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.title}
          </span>
        )}

        <div className="flex gap-2">
          {editingId === todo.id ? (
            <button
              onClick={() => saveEdit(todo.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => startEdit(todo.id, todo.title)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</main>
  );
}
