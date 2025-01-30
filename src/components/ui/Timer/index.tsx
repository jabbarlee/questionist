import React from 'react'
import {Typography} from '@mui/material'
import { useTimer } from 'react-timer-hook'

interface TimerProps {
    expiryTimestamp: Date;
    onExpire?: () => void;
    onStart?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onRestart?: (newExpiryTimestamp: Date) => void;
    onRunningChange?: (isRunning: boolean) => void;
}

export const Timer = ({ expiryTimestamp, onExpire, onStart, onPause, onResume, onRestart, onRunningChange }: TimerProps) => {

    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,    
    } = useTimer({ expiryTimestamp, onExpire: onExpire || (() => alert('onExpire called')) });

    React.useEffect(() => {
        if (onStart) onStart();
        if (onPause) onPause();
        if (onResume) onResume();
        if (onRestart) onRestart(expiryTimestamp);
    }, [start, pause, resume, restart, onStart, onPause, onResume, onRestart]);

    React.useEffect(() => {
        if (onRunningChange) onRunningChange(isRunning);
    }, [isRunning, onRunningChange]);

    return (
        <div>
            <div>
                <Typography>
                    {minutes < 10 ? '0' : null}{minutes}
                    :
                    {seconds < 10 ? '0' : ''}{seconds}
                </Typography>
            </div>
        </div>
    )
}
