import { Alert, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { useState } from "react";
import { addTask, newTaskID, tasksAtom } from "State/TaskState";
import ScheduleControls from "Components/ScheduleControls";

export default function TaskCreator() {
    const [newScheduleType, setNewScheduleType] = useState("Once");
    const [newItemCron, setNewItemCron] = useState("* * * * * *");
    const [newScheduleTime, setNewScheduleTime] = useState<Dayjs | null>(dayjs());
    const [newItemName, setNewItemName] = useState("");

    const [tasks, setTasks] = useAtom<any>(tasksAtom);

    const storeTask = () => {
        // if it's within one minute of now consider this being asked
        // to be executed "now".  so we can show a completed execution
        // for the purposes of a prototype
        let isTimeForNow = Math.abs(dayjs().diff(newScheduleTime, 'minute')) <= 1;

        console.log(dayjs().diff(newScheduleTime, 'minute'));

        let isTimeForNowStatus = isTimeForNow ? "executed" : "waiting";

        addTask(newTaskID(), {
            name: newItemName,
            scheduleType: newScheduleType,
            scheduleParam: (newScheduleType === "Once") ? newScheduleTime : newItemCron,
            // if it's a cron task it's going to be waiting for the purpose of our prototype
            // if it's a one-off check to see if it's for "now" or at a later time to
            // determine the correct status
            status: (newScheduleType === "Once") ? isTimeForNowStatus : "waiting",
            created: dayjs().format("DD/MM/YYYY HH:mm:ss")
        }, tasks, setTasks);

        resetView();
    }

    // handle reseting all the inputs in our view when
    // a task is submitted
    const resetView = () => {
        setNewItemCron("* * * * * *");
        setNewScheduleTime(dayjs());
        setNewItemName("");
        setNewScheduleType("Once");
    }

    // require that the new name have a length of atleast 1
    const isValid = () => {
        if (newItemName.length <= 0) {
            return [false, "Must supply a task name"]
        }

        return [true, ''];
    }

    const renderScheduleControl = () => {
        return <ScheduleControls type={newScheduleType} value={(newScheduleType === "Once") ? newScheduleTime : newItemCron} onChange={(v: any) => {
            if (newScheduleType === "Once") {
                setNewScheduleTime(v);
            }
            else {
                setNewItemCron(v);
            }
        }} onChangeType={(v: any) => {
            if (v === "Once") {
                setNewScheduleTime(dayjs())
            }
            else {
                setNewItemCron("* * * * * *");
            }
            setNewScheduleType(v);
        }} />
    }

    // render our submit button when it's valid to do so
    const renderSubmitButton = () => {
        const status = isValid();

        if (status[0] === true) {
            return <Button sx={{ width: '100%' }} id="submit-new-task" variant="outlined" onClick={storeTask}>Submit</Button>
        }
        else {
            return <Alert sx={{ width: '100%' }} severity="warning">{status[1]}</Alert>
        }
    }

    return <Stack className="taskCreator" direction={"row"} justifyContent={"center"} sx={{ width: '100%' }}>
        <div className="cardWrapper">
            <Card sx={{ width: '500px' }}>
                <CardContent>
                    <Stack spacing={1.0} direction={"column"}>
                        <Typography>Create a Scheduled Event</Typography>
                        <TextField value={newItemName} onChange={(e) => {
                            setNewItemName(e.target.value);
                        }} id="new-task" label="Name" variant="outlined" />
                        {renderScheduleControl()}
                    </Stack>
                </CardContent>
                <CardActions>
                    {renderSubmitButton()}
                </CardActions>
            </Card>
        </div>
    </Stack>
}
