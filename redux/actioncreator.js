




import { addTodoAction , doTodoAction , removeTodoAction } from "./actiontyps.js"

export const addTodoActionCreator = (title) =>{
    return{
        type : addTodoAction,
        title
    }

}
export const doTodoActionCreator = (id) =>{
   return {
    type : doTodoAction,
    id
   }

}
export const removeTodoActionCreator = (id) =>{
    return {
        type : removeTodoAction,
        id

    }
}