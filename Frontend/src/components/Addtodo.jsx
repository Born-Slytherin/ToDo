import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";

function Addtodo() {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setTitle("");
  }
  const email = localStorage.getItem("email");
  return (
    <>
      <div className="fixed bottom-0 w-full h-[150px] flex justify-center items-center">
        <button onClick={() => setOpenModal(true)} className="">
          <div className="w-20 h-20 bg-yellow-300 rotate-45 rounded-2xl flex items-center justify-center border border-black shadow-2xl custom-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 font-bolder rotate-45"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </button>
      </div>

      <Modal
        className="flex justify-center items-center md:px-32"
        dismissible
        show={openModal}
        onClose={onCloseModal}
      >
        <Modal.Body className="bg-yellow-300">
          <div className="space-y-6 ">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium font-bolder">
                Add a new Todo
              </h3>
              <div onClick={onCloseModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Title" />
              </div>
              <input
                id="title"
                placeholder="Enter the todo title"
                value={title}
                className="bg-black w-full p-4 rounded-xl text-white"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Todo Description" />
              </div>
              <input
                id="description"
                type="textbox"
                placeholder="Enter the todo description"
                value={description}
                required
                className="bg-black w-full p-4 rounded-xl text-white"
                onChange={(desc) => {
                  setDescription(desc.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <button
                className="w-full bg-[#960200] p-2 rounded-md text-white"
                onClick={(btn) => {
                  onCloseModal();
                  btn.preventDefault();
                  setError("");

                  const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: email,
                      title: title,
                      description: description,
                    }),
                  };
                  fetch("http://localhost:3001/addtodo", requestOptions)
                    .then((response) => response.json())
                    .then((res) => {
                      if (res.err) {
                        console.log(res);
                        setError(res.err);
                        return;
                      }
                      alert(res.message);
                    });
                }}
              >
                Create a new Todo
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Addtodo;
