import { Alert, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useState } from "react";
import { deleteTask, tasksAtom, updateTask } from "State/TaskState";
import ScheduleControls from "Components/ScheduleControls";

export default function TaskDisplay() {
    const [taskData, setTasks] = useAtom<any>(tasksAtom);
    const tasks = taskData.tasks;

    const [editingTask, setEditingTask] = useState(undefined);
    const [editingTaskScheduleType, setEditingTaskScheduleType] = useState("Once");
    const [editingTaskScheduleParam, setEditingTaskScheduleParam] = useState<any>(dayjs());

    const renderScheduleControl = () => {
        // render our controls for the schedule of a task
        return <ScheduleControls type={editingTaskScheduleType} value={editingTaskScheduleParam} onChange={(v: any) => {
            setEditingTaskScheduleParam(v);
        }} onChangeType={(v: any) => {
            if (v === "Once") {
                setEditingTaskScheduleParam(dayjs())
            }
            else {
                setEditingTaskScheduleParam("* * * * * *");
            }
            setEditingTaskScheduleType(v);
        }} />
    }

    const renderTaskStatus = (status: any) => {
        // depending on if the task has been executed or not show a
        // nice status banner
        if (status === "executed") {
            return <Alert severity="success">Has Executed</Alert>
        }
        if (status === "waiting") {
            return <Alert severity="warning">Waiting to Execute</Alert>
        }

        return <Alert severity="error">Unknown status</Alert>
    }

    const renderTaskControls = (task: any) => {
        // if we're not editing any tasks then show a delete and edit button for each task
        if (editingTask === undefined) {
            return <Stack direction={"row"} sx={{ width: '100%' }} spacing={3.0}>
                <Button disabled={task.status === "executed"} sx={{ width: '70%' }} variant="outlined" onClick={() => {
                    setEditingTaskScheduleType(task.scheduleType);

                    if (task.scheduleType === "Once") {
                        setEditingTaskScheduleParam(task.scheduleParam);
                    }
                    else {
                        setEditingTaskScheduleParam(task.scheduleParam);
                    }

                    setEditingTask(task.id);
                }}>Edit</Button>
                <Button sx={{ width: '28%' }} variant="outlined" onClick={() => {
                    deleteTask(task.id, taskData, setTasks);
                }}>Delete</Button>
            </Stack>
        }
        else {
            // otherwise hide the controls
            // and show the save button for the task we're currently editing
            if (task.id === editingTask) {
                return <Stack direction={"row"} sx={{ width: '100%' }} spacing={3.0}>
                    <Button sx={{ width: '100%' }} variant="outlined" onClick={() => {

                        let newParam = editingTaskScheduleParam;

                        if (editingTaskScheduleType === "Once") {
                            newParam = newParam;
                        }

                        updateTask(task.id, {
                            ...task,
                            scheduleType: editingTaskScheduleType,
                            scheduleParam: newParam
                        }, taskData, setTasks);

                        setEditingTaskScheduleType("Once");
                        setEditingTaskScheduleParam(dayjs());

                        setEditingTask(undefined);
                    }}>Save</Button>
                </Stack>
            }
            else {
                // can only edit one task at a time
                return undefined;
            }
        }
    }

    const renderTask = (task: any) => {
        // render the default region of this task, showing it's details
        let editingTaskRegion = <Stack direction="column">
            <Typography>Created: {task.created}</Typography>
            <Typography>Occurence: {task.scheduleType}</Typography>
            <Typography>Scheduled For: {(task.scheduleType === "Once") ? dayjs(task.scheduleParam).format("hh:mm") : task.scheduleParam}</Typography>
        </Stack>

        // if the user is currently editing this task render the edit controls instead
        if (editingTask === task.id) {
            editingTaskRegion = renderScheduleControl();
        }

        return <Stack className="taskCard" direction={"row"} justifyContent={"center"} sx={{ width: '100%' }}>
            <div className="cardWrapper">
                <Card sx={{ width: '800px' }}>
                    <CardContent>
                        {renderTaskStatus(task.status)}

                        <Stack spacing={1.0} justifyContent={"space-between"} sx={{ paddingTop: '5px' }} direction={"row"}>
                            <Stack direction="column">
                                <Typography fontSize={"2.0rem"}>{task.name}</Typography>
                            </Stack>
                            {editingTaskRegion}
                        </Stack>

                    </CardContent>
                    <CardActions>
                        {renderTaskControls(task)}
                    </CardActions>
                </Card>
            </div>
        </Stack>
    }

    // render each task into a stack for viewing
    let taskRenders = [];

    for (let i = 0; i < tasks.length; i++) {
        taskRenders.push(
            renderTask(tasks[i])
        )
    }

    // what to show before any tasks have been created
    let emptyTasksDisplay = <Typography color="white" textAlign={"center"} fontSize={"1.2rem"}>Create a new task to see it displayed here.</Typography>

    return <Stack sx={{ margin: '10px' }} spacing={2.0} direction="column">
        <Typography color="white" textAlign={"center"} fontSize={"2.0rem"}>Tasks</Typography>
        {taskRenders.length > 0 ? taskRenders : emptyTasksDisplay}
    </Stack>
}
