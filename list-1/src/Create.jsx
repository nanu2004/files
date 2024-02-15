// TodoList.jsx
import React, { useState } from 'react';

const Create = () => {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  // State for form input values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // State to track the index of the task being edited
  const [editIndex, setEditIndex] = useState(null);

  // Function to handle form submission or editing
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // If editIndex is not null, update the task at that index
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { name, description, completed: updatedTasks[editIndex].completed };
      setTasks(updatedTasks);
      // Reset editIndex to null after updating
      setEditIndex(null);
    } else {
      // Create a new task object with name and description
      const newTask = { name, description, completed: false };
      // Update the tasks state with the new task
      setTasks([...tasks, newTask]);
    }

    // Reset form input values
    setName('');
    setDescription('');
  };

  // Function to handle task deletion
  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Function to handle task completion
  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Function to handle task editing
  const handleEdit = (index) => {
    // Set the editIndex and populate the form with the task details
    setEditIndex(index);
    setName(tasks[index].name);
    setDescription(tasks[index].description);
  };

  return (
<div className="bg-black w-full md:w-2/3 lg:w-1/2 mx-auto p-8 rounded-lg text-white border-4 border-orange-500 text-center">



      <h1 className="text-3xl mb-4">Todo List</h1>
      
      {/* Form to add a new task or edit an existing one */}
      <form onSubmit={handleFormSubmit} className="mb-4 flex flex-wrap items-center justify-between bg-gray-900  bg-opacity-50 shadow-lg ">
  <div className="flex flex-col mb-2 text-white">
    <label htmlFor="name" className="mb-1 text-left">Name:</label>
    <input
      id="name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border p-2 w-40 text-black rounded-lg"
    />
  </div>

  <div className="flex flex-col mb-2 text-white mr-40">
    <label htmlFor="description" className="mb-1 text-left">Description:</label>
    <input
      id="description"
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border p-2 w-40 text-black rounded-lg "
    />
  </div>

  <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-full">
    {editIndex !== null ? 'Update Task' : 'Add Task'}
  </button>
</form>

      {/* Display the list of tasks */}
      <ul className="text-left ">
        {tasks.map((task, index) => (
          <li key={index} className={` p-2 mb-2 flex justify-between items-center bg-gray-800  bg-opacity-50 shadow-lg rounded-lg
          ${task.completed ? 'line-through' : ''}`}>
            <div className="flex flex-col items-start">
              <h5 className="text-orange-500 mb-1 text-3xl capitalize ">{task.name}</h5>
              <span className="text-white-400 text-1xl capitalize">{task.description}</span>
            </div>
            <div>


             {!task.completed ? <button
                onClick={() => handleComplete(index)}
                className={`bg-green-100 text-black px-3 py-1 rounded-full ${task.completed ? 'bg-gray-500 text-gray-500 cursor-not-allowed' : '' }`}
                disabled={task.completed} 
              >
                Complete
              </button>
              :null}
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-100 text-black px-3 py-1 ml-2 rounded-full"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-rose-100 text-black px-3 py-1 ml-2 rounded-full border border-solid border-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Create;
