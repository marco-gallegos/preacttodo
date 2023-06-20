import './app.css'
import { ITask } from "./types"
import { useSignal, Signal } from "@preact/signals"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

interface IUseTodo {
    todos: Signal<ITask[]>
    addTodo: (task:ITask) => boolean
    deleteTodo: (taskId:string) => boolean
    updateTodo: (taskId:string, task:ITask) => boolean
    markAsDone: (taskId:string) => boolean
}

const useTodo = ():IUseTodo => {
    const todos = useSignal([])

    const addTodo = (task:ITask):boolean => {
        const newTask:ITask = {
            ...task,
            id: `${Date.now()}`,
            done:false
        }

        todos.value = [ ...todos.value, newTask ]

        return true
    }
    const deleteTodo = (taskId:string):boolean => {
        return false
    }
    const updateTodo = (taskId:string, task:ITask):boolean => {
        return false
    }
    const markAsDone = (taskId:string):boolean => {
        return false
    }

    return {
        todos: todos,
        addTodo,
        deleteTodo,
        updateTodo,
        markAsDone,
    }
}

export function App() {
    const mainTodoState = useTodo()

    // ui controls
    const showForm:Signal<boolean> = useSignal(false)

    const toggleTaskForm = () => showForm.value = !showForm.value

    return (
        <>
            <h1>TO-DO List</h1>
            {
                showForm.value === true ? (
                    <div>
                        <TaskForm addTask={mainTodoState.addTodo} />
                    </div>
                ):(
                    <div>
                        <button onClick={toggleTaskForm} >add task</button>
                    </div>
                )
            }
            <div>
                <TaskList tasks={mainTodoState.todos.value} />
            </div>
        </>
    )
}
