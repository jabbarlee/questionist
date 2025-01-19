"use client"

import React from "react";
import { Line } from "react-chartjs-2";
import Typography from '@mui/material/Typography';
import styles from './index.module.css'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ScoreChart: React.FC = () => {
    // Sample dataset simulating user scores over time
    const labels = ["01/02", "01/06", "01/04", "01/06", "01/21", '02/12']; // X-axis labels (Months)
    const dataPoints = [40, 65, 90, 20, 80, 67]; // Y-axis values (Scores)

    // Chart data
    const data = {
        labels: labels, // X-axis labels
        datasets: [
            {
                data: dataPoints, // Y-axis values
                borderColor: "#096dd9", // Line color
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Fill under the line
                borderWidth: 2, // Line thickness
                pointRadius: 4, // Size of data points
                pointBackgroundColor: "#096dd9", // Color of data points
                pointBorderWidth: 2, // Border thickness of points
                tension: 0.3, // Smoothness of the curve
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide the legend completely
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                beginAtZero: true, // Start Y-axis at 0
                max: 100, // Set max score for the Y-axis
                title: {
                    display: true,
                    text: "Score",
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className={styles.chartWrapper}>
            <Line data={data} options={options} style={{ height: 'fit-content' }}/>
        </div>
    );
};

export default ScoreChart;
