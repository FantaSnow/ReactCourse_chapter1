import React, { useState } from "react";
import ToDoTable from "./ToDoTable";
import AddToDoComponent from "./AddToDoComponent";
import SearchInput from "./SearchInput";
import useGetAllToDo from "./Hooks/UseToDos";

const ToDoContainer = () => {
  const { isLoading, data: toDos, setData: setToDos } = useGetAllToDo(); // Destructure from the hook
  const [newToDo, setNewToDo] = useState({ title: "" });
  const [searchTerm, setSearchTerm] = useState("");

  function handleNewTitleChange(event) {
    setNewToDo({ ...newToDo, title: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newToDo.title.trim()) {
      const newTodoWithId = { id: Date.now(), ...newToDo };
      setToDos([...toDos, newTodoWithId]);
      setNewToDo({ title: "" });
    } else {
      alert("ToDo title cannot be empty.");
    }
  }

  function handleDelete(id) {
    const updatedToDos = toDos.filter((toDo) => toDo.id !== id);
    setToDos(updatedToDos);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredToDos = toDos.filter((toDo) =>
    toDo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AddToDoComponent
        title={newToDo.title}
        onTitleChange={handleNewTitleChange}
        onSubmit={handleSubmit}
      />
      <SearchInput
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ToDoTable toDos={filteredToDos} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ToDoContainer;