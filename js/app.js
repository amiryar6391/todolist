

import { addTodoActionCreator , doTodoActionCreator , removeTodoActionCreator} from "../redux/actioncreator.js"
import { addTodoAction , doTodoAction , removeTodoAction } from "../redux/actiontyps.js"

const todoInput=document.getElementById('todoInput')
const addTodoBtn=document.getElementById('addTodoBtn')
const todoItemContainer=document.querySelector('.todoItemContainer')

let todoreducer = (state = [] , action) => {
    switch(action.type){
        case addTodoAction :{
          let  newstate=[...state]
          let newtodo={
                id : state.length+1,
                title : action.title,
                isComplate : false

            }
            newstate.push(newtodo)
            return newstate
          

        }
        case doTodoAction :{
            let newstate=[...state]
            newstate.forEach(todo =>{
                if(todo.id == action.id){
                    todo.isComplate = !todo.isComplate
                }
                

            })
            return newstate
            
        }
        case removeTodoAction :{
            let newstate=[...state]
            newstate=newstate.filter( todo =>{
                return todo.id != action.id
            })
            return newstate
        }
        default:{
            return state
        }
            

    }

}


let store = Redux.createStore(todoreducer)

addTodoBtn.addEventListener('click' , ()=>{
    if(todoInput.value != ''){
        createtodo()
    }else{
        todoInput.focus()

    }
})


window.addEventListener('keydown', (e) => {
    e.key == 'Enter' && todoInput.value != '' && createtodo()
       
    })  


let createtodo = ()=>{
    let inputvalue = todoInput.value
    store.dispatch(addTodoActionCreator(inputvalue))
    todoInput.value = ''
    todoInput.focus()
}

let dotohandler = (id)=>{
    store.dispatch(doTodoActionCreator(id))
}

let removehandler = (id)=>{
    store.dispatch(removeTodoActionCreator(id))
}

const generate = (id , title , isComplate)=>{
    return `<div class="todoItem ${isComplate && "completed"}" onclick=dotohandler(${id})>
    <span>${title}</span>
    <span class="material-symbols-outlined" onclick=removehandler(${id})> delete </span>
  </div>`
}

const renderUI = () =>{
    let todos=store.getState();
    todoItemContainer.innerHTML=''
    todos.map( (todo) => todoItemContainer.insertAdjacentHTML("beforeend" , generate(todo.id , todo.title , todo.isComplate)))
}

renderUI()

store.subscribe(renderUI)

window.onload=() => todoInput.focus()

window.dotohandler=dotohandler
window.removehandler=removehandler



