import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

interface Props {
    value?: string;
    onChange: any;
}

export default function CronEditor(props: Props) {
    const {
        onChange,
        value
    } = props;

    // if we're given a starting value use it, otherwise fallback to an all *
    // cron statement
    let startingValue = value ? value : "* * * * *";
    const startingValueBits = startingValue.split(" ");

    const [minute, setMinute] = useState(startingValueBits[0]);
    const [hour, setHour] = useState(startingValueBits[1]);
    const [dayOfMonth, setDayOfMonth] = useState(startingValueBits[2]);
    const [month, setMonth] = useState(startingValueBits[3]);
    const [dayOfWeek, setDayOfWeek] = useState(startingValueBits[4]);

    const handleCronChange = (slug: any, newValue: string) => {
        let _minute = minute;
        let _hour = hour;
        let _dayOfMonth = dayOfMonth;
        let _month = month;
        let _dayOfWeek = dayOfWeek;

        // handle updating with our "just changed" value
        // so it's present despite the delay in setting state

        switch (slug) {
            case "minute": _minute = newValue; break;
            case "hour": _hour = newValue; break;
            case "dayOfMonth": _dayOfMonth = newValue; break;
            case "month": _month = newValue; break;
            case "dayOfWeek": _dayOfWeek = newValue; break;
        }

        const newCronString = `${_minute} ${_hour} ${_dayOfMonth} ${_month} ${_dayOfWeek}`;
        onChange(newCronString);
    };

    const handleChange = (setter: any, slug: any) => (event: any) => {
        setter(event.target.value);
        handleCronChange(slug, event.target.value);
    };

    const renderFormControl = (label: string, value: string, onChange: any, keyLength: number) => {
        return <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onChange}>
                {Array.from({ length: keyLength }, (_, i) => (
                    <MenuItem key={i} value={i.toString()}>
                        {i}
                    </MenuItem>
                ))}
                <MenuItem value="*">*</MenuItem>
            </Select>
        </FormControl>
    }

    // a boilerplate cron editor to allow the user
    // to edit it with dropdowns
    // we handle each category of cron configuration with a form control
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Cron Editor</Typography>
            {renderFormControl("Minute", minute, handleChange(setMinute, "minute"), 60)}
            {renderFormControl("Hour", hour, handleChange(setHour, "hour"), 24)}
            {renderFormControl("Day of Month", dayOfMonth, handleChange(setDayOfMonth, "dayOfMonth"), 31)}
            {renderFormControl("Month", month, handleChange(setMonth, "month"), 12)}
            {renderFormControl("Day of Week", dayOfWeek, handleChange(setDayOfWeek, "dayOfWeek"), 7)}
            <TextField
                label="Cron String"
                value={`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`}
                InputProps={{ readOnly: true }}
            />
        </Box>
    );
}
