"use client"

import React from 'react'
import { useTimer } from 'react-timer-hook';
import { Button } from 'antd';
import Typography from "@mui/material/Typography";

export const Timer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,    
    } = useTimer({ expiryTimestamp, onExpire: () => alert('onExpire called') });

    return (
        <div> 
            <p>Timer Demo</p>
            <div style={{fontSize: '100px'}}>
                <Typography>
                    {minutes < 10 ? '0' : null}{minutes}
                    :
                    {seconds < 10 ? '0' : ''}{seconds}
                </Typography>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <Button onClick={start}>Start</Button>
            <Button onClick={pause}>Pause</Button>
            <Button onClick={resume}>Resume</Button>
            <Button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
            }}>Restart</Button>
        </div>
    )
}