import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function Todo() {
    let [todos , setTodos] = useState([{title:"Sample text" , id:uuidv4(),isMarked:false}])
    let [task , setTask] = useState("")
    let updateTask = (event) =>{
        setTask(event.target.value)
    }
    let updateList = () =>{
        setTodos((prevTodos)=>{
            return[...prevTodos , {title:task , id:uuidv4(),isMarked:false}]})
        setTask("")
    }
    let deleteTodo = (id)=>{
        setTodos(prevTodos=>prevTodos.filter((todo)=>(todo.id != id)));
    }
    let MarkDone = (id)=>{
        // this update so use map here
        setTodos((prevTodos)=>(prevTodos.map((todo)=>{
            if(todo.id == id){
                return {...todo , isMarked:!todo.isMarked};
            }else{
                return todo;
            }
        })));
        
    }
    let markAll=()=>{
        setTodos((prevTodos)=>(
            prevTodos.map((todo)=>({...todo , isMarked:true}))
        ));
    }
    return(<>
        <h1>To-do App</h1>
        <input type="text" value = {task} onChange = {updateTask}/>
        <button onClick = {updateList}>Add</button>
        <hr />
        <ul>
            {todos.map((todo)=>(<li>
                <button onClick={()=>(MarkDone(todo.id))}>Done</button>
                <span style={{textDecoration : todo.isMarked ? "line-through":"none"}} id={todo.id}>{todo.title}</span> &nbsp;&nbsp;&nbsp;
                <button onClick={()=>(deleteTodo(todo.id))}>Delete </button></li>))}
        </ul>
        <button id="markAll" onClick={markAll}>Mark All Done</button>

    </>)
}