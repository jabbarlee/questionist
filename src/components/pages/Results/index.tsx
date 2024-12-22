"use client"

import React, { useEffect, useState } from 'react';
import { getAllResults } from "@/actions/firebase/getDoc";
import PracticeSession from "@/components/ui/Results/All";
import Page from "@/components/ui/_wrappers/Page";
import Header from "@/components/ui/_wrappers/Header";
import SessionsWrapper from "@/components/ui/_wrappers/SessionsWrapper";
import Main from "@/components/ui/_wrappers/Main";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal, Button, Result } from "antd";

export default function Index() {
    const [sessions, setSessions] = useState<object[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <Page>
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

            {/* Modal */}
            <Modal
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
                centered
            >
                <Result
                    status="success"
                    title="Deleted session successfully!"
                    subTitle={modalMessage}
                />
            </Modal>
        </Page>
    );
}
