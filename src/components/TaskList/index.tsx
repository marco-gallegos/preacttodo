import { ITask } from "../../types"

interface ITaskListProps {
    tasks: ITask[]
}

const TaskList = (props : ITaskListProps) => {
    return (
        <div>
            {
                props.tasks.map((task:ITask) => {
                    return (
                        <div>
                            { task.title }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TaskList
