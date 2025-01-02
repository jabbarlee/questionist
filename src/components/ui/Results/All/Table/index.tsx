import { Table, Tag, Button, Space } from "antd";
import { StarOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";
import { SessionData } from "@/types";

interface TableProps {
    sessions: SessionData[];
    showModal: (sessionId: string) => void;
}

export default function ResultsTable({ sessions, showModal }: TableProps) {
    const columns = [
        {
            title: "Name",
            dataIndex: "sessionName",
            key: "sessionName",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => new Date(date).toLocaleDateString(), // Format date
        },
        {
            title: "AXP",
            dataIndex: "results.axpGained",
            key: "axpGained",
            render: (_: any, record: SessionData) => (
                <>
                    {record.results?.axpGained == 0 ? (
                        <Tag color='cyan'>
                            0
                        </Tag>
                    ) : (
                        <Tag color='cyan-inverse'>
                            + {record?.results?.axpGained}
                        </Tag>
                    )}
                </>
            )
        },
        {
            title: "Brilliants",
            dataIndex: "results.brilliantsGained",
            key: "brilliantsGained",
            render: (_: any, record: SessionData) =>
                <>
                    {record.results?.brilliantsGained == 0 ? (
                        <Tag color='gold'>
                            0
                        </Tag>
                    ) : (
                        <Tag color='gold-inverse'>
                            + {record?.results?.brilliantsGained}
                        </Tag>
                    )}
                </>
        },
        {
            title: "Difficulty",
            dataIndex: "difficulty",
            key: "difficulty",
            render: (difficulty: string[]) => (
                <>
                    {difficulty.map((level) => (
                        <Tag color="blue" key={level}>
                            {level.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Type",
            key: "type",
            render: (_: any, record: SessionData) => {
                const type = record.numberOfQuestions === 5 ? "miniset" : "classic";
                const color = type === "classic" ? "purple" : "green";
                return (
                    <Tag color={color} key={type}>
                        {type.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Overall Score",
            dataIndex: "results.overallScore",
            key: "overallScore",
            render: (_: any, record: SessionData) => {
                const overallScore = record.results?.overallScore || 0;
                return (
                    <div className={styles.progressWrapper}>
                        <div>
                            <p className={styles.scoreText}>{record.results?.overallScore}%</p>
                        </div>
                        <div className={styles.progressBarContainer}>
                            <div
                                className={`${styles.progressBar} ${
                                    overallScore === 100
                                        ? styles.greenProgress
                                        : styles.purpleProgress
                                }`}
                                style={{width: `${overallScore}%`}}
                            />
                        </div>

                    </div>
                );
            },
        },
        {
            title: "Actions",
            key: "action",
            render: (_: any, record: SessionData) => (
                <Space size="middle">
                    <Button type="default" style={{borderColor: "#ccc"}}>
                        <Link href={`/results/${record.sessionId}`}>
                            <span>View</span>
                        </Link>
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={() => showModal(record.sessionId)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={sessions}
            rowKey="sessionId"
            bordered
            style={{ width: "100%" }}
        />
    );
}
