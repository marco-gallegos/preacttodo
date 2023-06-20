import { useSignal } from "@preact/signals"
import { ITask } from "../../types"

interface ITaskFormProps {
    addTask: Function
}

const TaskForm = (props : ITaskFormProps) => {
    let title = useSignal(null)
    let description = useSignal(null)
    let dueDate = useSignal(null)
    
    let loading = useSignal(false)

    const formIsValid = ():boolean => {
        if(title.value === null || description.value === null || dueDate.value === null){
            return false
        }

        if(title.value?.length < 1 || description.value?.length < 1){
            return false
        }
        return true
    }

    const handleAddTask  = () => {
        loading.value = true
        if(formIsValid() === false){
            return false
        }

        const newTask:ITask = {
            title: title.value ?? "",
            description: description.value?? "",
            dueDate: dueDate.value ?? ""
        }
        const wasAdded = props.addTask(newTask)

        setTimeout(() => {
            loading.value = false
        }, 400)
    }

    return (
        <div class="formRoot" >
            <div class="formRow" >
                <label>Title</label>
                <input onChange={(event:Event)=> title.value = event.target?.value} />
            </div>
            <div class="formRow" >
                <label>Description</label>
                <textarea onChange={(event:Event)=> description.value = event.target?.value} />
            </div>
            <div class="formRow" >
                <label>Due Date</label>
                <input type="date" onChange={(event:Event)=> dueDate.value = event.target?.value} />
            </div>
            <div>
                <button onClick={handleAddTask} disabled={loading} >create</button>
            </div>
        </div>
    )
}

export default TaskForm
