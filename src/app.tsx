import './app.css'
import { signal, useSignal, Signal } from "@preact/signals"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"


interface ITask {
    title:string
    description: string
    dueDate: string// time stamp
    done: boolean
}

interface IUseTodo {
    todos: Signal<ITask[]>
    addTodo: Function
    deleteTodo: Function
    updateTodo: Function
    markAsDone: Function
}

const useTodo = ():IUseTodo => {
    const todos = useSignal([])

    const addTodo = () => {}
    const deleteTodo = () => {}
    const updateTodo = () => {}
    const markAsDone = () => {}

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
    const showForm:Signal<boolean> = useSignal(true)

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
                        <button>add task</button>
                    </div>
                )
            }
            <div>
                <TaskList tasks={mainTodoState.todos} />
            </div>
        </>
    )
}
