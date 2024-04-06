import React, { useEffect, useState } from "react";

function Showtodo() {
  useEffect(() => {
    fetch("http://localhost:3001/gettodo", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.err) {
          console.log(res);
          setError(res.err);
          return;
        }
        setTodo(res.data.todos);
        console.log(res.data.todos);
      });
  }, []);

  const [todos, setTodo] = useState([]);
  const email = localStorage.getItem("email");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
    }),
  };

  return (
    <div className="mt-4 p-4 flex flex-col gap-2">
      {todos.map((todo) => (
        <div className="bg-yellow-300 divide-y divide-black p-4 rounded-xl">
          <div className="flex justify-between">
            <h1>{todo.title}</h1>
            {todo.completed ? (
              <span className="text-red-400">True</span>
            ) : (
              <span className="text-blue-500">False</span>
            )}
          </div>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Showtodo;
