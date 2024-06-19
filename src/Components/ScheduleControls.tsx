import { Stack, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CronEditor from "./CronEditor";

interface Props {
    type: any;
    onChangeType: any;
    value: any;
    onChange: any;
}

export default function ScheduleControls(props: Props) {
    const {
        type,
        onChangeType,
        value,
        onChange
    } = props;

    return <Stack direction={"column"}>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={type}
            onChange={(_, v) => {
                onChangeType(v);
            }}
        >
            <FormControlLabel value="Once" control={<Radio />} label="Once" />
            <FormControlLabel value="Repeating" control={<Radio />} label="Repeating" />
        </RadioGroup>
        {type === "Once" ? <TimePicker
            //@ts-ignore
            value={value} onChange={(v) => {
                onChange(v);
            }} /> : <CronEditor value={value} onChange={onChange} />}
    </Stack>
}
