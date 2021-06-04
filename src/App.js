import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

 const App = () => {
   const [todos, settodos] = useState(() => {
     const savedTodos = localStorage.getItem("todos")
     if (savedTodos)
     {
       return JSON.parse(savedTodos)
     }
     else{
       return [];
     }
   });
   const [todo, setTodo] = useState("");
   const [isEditing, setEditing] = useState(false);
   const [currentTodo, setCurrentTodo] = useState({});

   function handleEditInPutChange (e){
     setCurrentTodo({...currentTodo, text: e.target.value })
     console.log("Current Todo ", currentTodo);

   }

   useEffect(() => {
     localStorage.setItem('todos', JSON.stringify(todos))
   }, [todos])
  function handleInputChange(e) {
    setTodo(e.target.value)
  }
  function handleSubmitform(e) {
    e.preventDefault();
    if (todo !== "")
    {
      settodos([
        ...todos,
        {
            id: todos.length + 1,
            text: todo.trim()
        }
      ])
    }
  }

  function handleDeleteClick(id){
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })
    settodos(removeItem)
  }

  function handleEditClick(todo){
    setEditing(true);
    setCurrentTodo({ ...todo });
  
  }

  function handleUpdateTodo(id, updatedTodo){
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
   setEditing(false);
   settodos(updatedItem);
  }

  function handleEditFormSubmit(e){
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

console.log(todos)

  return (
    <div className="App">
     <h1> Todo List </h1>

     {isEditing ? (
       <form onSubmit = {handleEditFormSubmit}>
         <h2>Edit Todo</h2>
         <label htmlFor ="editTodo">Edit todo:</label>
         <input
         type = "text"
         name = "editTodo"
         placeholder = "Edit todo"
         value = {currentTodo.text}
         onChange = {handleEditInPutChange}
         />
         
        <button type = "submit">update</button>
        <button onClick = {() => setEditing(false)}>Cancel</button>
       </form>
     ) : (<form onSubmit = {handleSubmitform}>
      <input
      type = "text"
      name = "todo"
      placeholder = "Create todo here"
      onChange = {handleInputChange}/>
      <button type = "submit">Add</button>
      </form>
       
     )}
       <ul className = "todo-list">
         {todos.map((todo) => (

         <li key={todo.id}>
           {todo.text}
           {"              "}
           <button onClick ={() => handleEditClick(todo)} >Edit</button>
           <button onClick = {() => handleDeleteClick(todo.id)}>Delete</button>
           
         </li>
         ))}

       </ul>
    </div>
  );
}

export default App;
