"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from './index.module.css';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { fetchScoresDates } from "@/actions/firebase/get/fetchScoresDates";
import dayjs from "dayjs";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ScoreChart: React.FC = () => {
    const [sessions, setSessions] = useState<{ date: string; score: number }[]>([]);

    useEffect(() => {
        const fetchSessions = async () => {
            const data = await fetchScoresDates();
            setSessions(data);
        };

        fetchSessions();
    }, []);

    // Aggregate scores by date, calculating the average for each day
    const aggregateScores = (sessions: { date: string; score: number }[]) => {
        const aggregatedData: Record<string, { totalScore: number; count: number }> = {};

        sessions.forEach(({ date, score }) => {
            if (!aggregatedData[date]) {
                aggregatedData[date] = { totalScore: 0, count: 0 };
            }
            aggregatedData[date].totalScore += score;
            aggregatedData[date].count += 1;
        });

        return Object.entries(aggregatedData).map(([date, { totalScore, count }]) => ({
            date,
            averageScore: totalScore / count, // Calculate the average score for each date
        }));
    };

    const aggregatedData = aggregateScores(sessions);

    const labels = aggregatedData.map((item) => dayjs(item.date).format("MMM DD")); // X-axis labels
    const dataPoints = aggregatedData.map((item) => item.averageScore); // Y-axis values

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: { display: true, text: "Date" },
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Average Score" },
                ticks: {
                    stepSize: 10, // Show increments of 10 on the Y-axis
                    max: 100, // Ensure the max value is 100
                },
            },
        },
    };

    return (
        <div className={styles.chartWrapper}>
            <Line data={data} options={options} style={{ height: 'fit-content' }} />
        </div>
    );
};

export default ScoreChart;
