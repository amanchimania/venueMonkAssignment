import './App.css';
import React from "react"
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';


function Todo() {
    const [data, setData] = useState(JSON.parse((localStorage.getItem("todoStore"))) || [])
    const [search, setSearch] = useState("")
    const [searchedData, setSearchedData] = useState(JSON.parse((localStorage.getItem("todoStore"))) || [])
    const [flag, setflag] = useState(true)

    const [todo, setTodo] = useState({
        title: "",
        description: "",
        completed: true
    })

    const handleInput = (e) => {
        // console.log(e);
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }
    const handleData = (e) => {
        e.preventDefault();
        if (todo.title.length === 0 || todo.description.length === 0) {
            alert("Title and description cannot be empty")
        }
        else {
            let copyTodo = [...data]
            copyTodo.push(todo);
            setData(copyTodo)
            localStorage.setItem("todoStore", JSON.stringify(copyTodo))
        }
        setTodo({
            title: "",
            description: ""
        })
        // console.log(data);
    }
    const deleteTodo = (title, description) => {
        // console.log(title);
        let deleteTodo = data.filter(val => val.title !== title || val.description !== description)
        // console.log(deleteTodo);
        setData(deleteTodo)
        localStorage.setItem("todoStore", JSON.stringify(deleteTodo))
    }
    const marked = (name1) => {
        // console.log(name);
        let copyData = [...data]
        let tempTodo = copyData.find(val => val.title == name1)
        tempTodo.completed = !tempTodo.completed;
        setData(copyData)
        localStorage.setItem("todoStore", JSON.stringify(copyData))
        // console.log(tempTodo);
    }
    const handleSearchBox = () => {
        // setSearch(e.target.value)
        // var inputData = document.getElementById("aaa").value

        let searchedData = data.filter((val) => {
            if (val.title.toLowerCase().includes(search.toLowerCase()) || val.description.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        })
        console.log(searchedData);
        setSearchedData(searchedData)
        setflag(false)

    }
    return (
        <div className="App">
            {/* <> */}
            <h1 className="App-header">Todo List</h1><br />
            <div>
                <input type="text" id="aaa" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter any Title/Description to search" />&nbsp;
                <button onClick={handleSearchBox}><FaSearch onClick={handleSearchBox} /></button>
            </div><br />
            {!flag && <><br /><button onClick={() => { setflag(true); setSearch("") }} className="see-data">See all data</button><br /><br /><br /></>}

            {flag && <>
                <form className="mr-2">
                    <input type="text" placeholder="Enter Title" name="title" value={todo.title} onChange={handleInput} />
                    <input type="text" placeholder="Todo Description" name="description" value={todo.description} onChange={handleInput} />
                    <input type="submit" onClick={handleData} />
                </form><br /><br />
                <h3 className="text-danger">Click on the card to mark it as complete</h3>
                <br />
                <div className="main-card">
                    {data.map((val, idx) => (
                        <div key={idx}>
                            <div key={val.title} style={{ border: "1px solid black" }} className="card-body" onClick={() => marked(val.title)} >

                                {val.completed ? <div className="cards"><b>{val.title}</b><br /><hr />{val.description}</div> : <div className="cards"><del><b>{val.title}</b><br /><hr />{val.description}</del></div>}


                            </div>
                            <div className="button-delete"><button onClick={() => deleteTodo(val.title, val.description)} style={{ border: "1px solid black", backgroundColor: "rgb(209, 209, 205)", width: "100px", borderRadius: "5px 5px", backgroundColor: "#FF6347", fontSize: "large" }} >Delete</button></div>
                            <br /><br /><br />
                        </div>

                    ))}
                </div>
            </>}
            <div className="main-card">
                {!flag && <>

                    {searchedData.map((val, idx) => {
                        return (
                            <div>
                                <div key={val.title} style={{ border: "1px solid black" }} className="card-body" onClick={() => marked(val.title)} >
                                    {val.completed ? <div className="cards"><b>{val.title}</b><br /><hr />{val.description}</div> : <div className="cards"><del><b>{val.title}</b><br /><hr />{val.description}</del></div>}
                                </div>
                                <br />
                            </div>
                        )
                    })}
                </>}
            </div>




        </div >


    );
}

export default Todo
