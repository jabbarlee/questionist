"use client";

import React, { useEffect, useState } from "react";
import Page from "@/components/ui/_wrappers/Page";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import ResultsTable from "@/components/ui/Results/All/Table";
import { Modal, Button, Alert, Result } from "antd";
import { deletePracticeSession } from "@/actions/firebase/delete/deletePracticeSession";
import { fetchResults } from "@/actions/firebase/get/getAllResults";
import { SessionData } from "@/types";
import { useCurrentUser } from "@/lib/context/UserContext";

export default function Results() {
  const { uid } = useCurrentUser();

  const [sessions, setSessions] = useState<SessionData[]>([]); // Initialized to empty array
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);

  useEffect(() => {
    fetchResults({ uid, setSessions });
  }, []);

  const refreshSessions = async () => {
    await fetchResults({ setSessions });
  };

  const showModal = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCurrentSessionId(null);
  };

  const handleDelete = async () => {
    if (currentSessionId) {
      const { success } = await deletePracticeSession(currentSessionId);
      if (success) {
        setSuccessAlertVisible(true);
        await refreshSessions();
        handleModalClose();
        setTimeout(() => setSuccessAlertVisible(false), 3000);
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
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        />
      )}
      <Header>Results</Header>
      <Main>
        <ResultsTable
          sessions={sessions} // Transformed data passed to ResultsTable
          showModal={showModal}
        />
      </Main>
      <Modal
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
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
