import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([] || JSON.parse((localStorage.getItem("todoStore"))))
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false
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
  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Enter Title" name="title" onChange={handleInput} />
        <input type="text" placeholder="Todo Description" name="description" onChange={handleInput} />
        <input type="submit" onClick={handleData} />
      </form>
      {data.map((val, idx) => (
        <div key={val.title}>
          {val.title}
          {val.description}
          <button onClick={() => deleteTodo(val.title)}>Delete</button>
        </div>
      ))}
    </div>

  );
}

export default App;
