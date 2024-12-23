"use client";

import React, { useEffect, useState } from "react";
import { getAllResults } from "@/actions/firebase/getDoc";
import PracticeSession from "@/components/ui/Results/All";
import Page from "@/components/ui/_wrappers/Page";
import Header from "@/components/ui/_wrappers/Header";
import SessionsWrapper from "@/components/ui/_wrappers/SessionsWrapper";
import Main from "@/components/ui/_wrappers/Main";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal, Button, Result, Alert } from "antd";
import { deletePracticeSession } from "@/actions/firebase/deleteDoc";

export default function Index() {
    const [sessions, setSessions] = useState<object[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);

    const fetchResults = async () => {
        try {
            const allSessions = await getAllResults();
            setSessions(allSessions);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const refreshSessions = async () => {
        await fetchResults();
    };

    const showModal = (sessionId: string) => {
        setCurrentSessionId(sessionId); // Set the sessionId to delete
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setCurrentSessionId(null); // Clear the sessionId
    };

    const handleDelete = async () => {
        if (currentSessionId) {
            const { success } = await deletePracticeSession(currentSessionId);
            if (success) {
                setSuccessAlertVisible(true); // Show the alert on success
                await refreshSessions();
                handleModalClose();
                setTimeout(() => setSuccessAlertVisible(false), 3000); // Auto-hide alert after 3 seconds
            }
        }
    };

    return (
        <Page>
            {successAlertVisible && (
                <Alert
                    message="Session deleted successfully!"
                    type="success"
                    banner
                    showIcon
                />
            )}
            <Header>Results</Header>
            <Main>
                {sessions ? (
                    <SessionsWrapper>
                        {sessions.map((session: any) => (
                            <PracticeSession
                                key={session.sessionId}
                                session={session}
                                refreshSessions={refreshSessions}
                                showModal={showModal}
                            />
                        ))}
                    </SessionsWrapper>
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                    </div>
                )}
            </Main>
            <Modal
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
                centered
                style={{ padding: "0px" }}
            >
                <Result
                    status="warning"
                    title="Are you sure you want to delete this session?"
                    subTitle="This action cannot be undone."
                    extra={[
                        <Button key="cancel" onClick={handleModalClose}>
                            Cancel
                        </Button>,
                        <Button key="delete" type="primary" danger onClick={handleDelete}>
                            Delete
                        </Button>,
                    ]}
                />
            </Modal>
        </Page>
    );
}