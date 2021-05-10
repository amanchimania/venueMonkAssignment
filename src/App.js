import './App.css';
import React from "react"
import { useState } from 'react';

function App() {
  const [data, setData] = useState(JSON.parse((localStorage.getItem("todoStore"))) || [])
  const [search, setSearch] = useState("")

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: true
  })
  console.log(data);
  const handleInput = (e) => {
    // console.log(e);
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    })
  }
  const handleData = (e) => {
    e.preventDefault();
    let copyTodo = [...data]
    copyTodo.push(todo);
    setData(copyTodo)
    localStorage.setItem("todoStore", JSON.stringify(data))
    console.log(data);
  }
  const deleteTodo = (title) => {
    console.log(title);
    let deleteTodo = data.filter(val => val.title !== title)
    console.log(deleteTodo);
    setData(deleteTodo)
  }
  const marked = (name1) => {
    // console.log(name);
    let copyData = [...data]
    let tempTodo = copyData.find(val => val.title == name1)
    tempTodo.completed = !tempTodo.completed;
    setData(copyData)
    console.log(tempTodo);
  }
  const handleSearchBox = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div className="App">
      <input type="text" onChange={handleSearchBox} />
      <form>
        <input type="text" placeholder="Enter Title" name="title" onChange={handleInput} />
        <input type="text" placeholder="Todo Description" name="description" onChange={handleInput} />
        <input type="submit" onClick={handleData} />
      </form>
      {data.map((val, idx) => (
        <div key={val.title} >
          <div onClick={() => marked(val.title)} style={{ border: "1px solid black" }}>
            {val.completed ? <div>{val.title}
              {val.description}</div> : <del>{val.title}
              {val.description}</del>}
          </div>
          <button onClick={() => deleteTodo(val.title)}>Delete</button>
        </div>
      ))}
    </div>

  );
}

export default App;
