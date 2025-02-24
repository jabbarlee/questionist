"use client";

import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { ContractCard } from "@/components/ui/Contracts/ContractCard";
import { ContractProps } from "@/types";
import { getAllContracts } from "@/actions/firebase/get/getAllContracts";
import { Modal, Tag, Divider } from "antd";
import { Typography } from "@mui/material";

export const ContractPage = () => {
  const [contracts, setContracts] = useState<ContractProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedContract, setSelectedContract] = useState<ContractProps | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const fetchedContracts = await getAllContracts();
        if (fetchedContracts) {
          setContracts(fetchedContracts);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (loading) return <p>Loading contracts...</p>;
  if (!contracts || contracts.length === 0) return <p>No contracts available.</p>;

  const openModal = (contractID: string) => {
    const contract = contracts.find((contract) => contract.contractID === contractID);
    if (contract) {
      setSelectedContract(contract);
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.contractContainer}>
      <div className={styles.featuredContracts}>
        <Typography fontSize={'24px'}>⭐️ Featured contracts</Typography>
        <div className={styles.contractsContainer}>
          {contracts && (
            <>
              <ContractCard contract={contracts[0]} openModal={() => openModal(contracts[0].contractID)} special/>
              <ContractCard contract={contracts[1]} openModal={() => openModal(contracts[1].contractID)} special/>
            </>
          )}
        </div>
      </div>
      <Divider/>
      <div className={styles.contractsContainer}>
        {contracts.slice(2).map((contract, index) => (
          <ContractCard key={index + 2} contract={contract} openModal={() => openModal(contract.contractID)} />
        ))}
      </div>
      {selectedContract && (
        <Modal
          title={selectedContract.title}
          centered
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          <Typography>{selectedContract.description}</Typography>
          <Tag>{selectedContract.difficulty}</Tag>
          <Typography>Time limit: {selectedContract.timeLimit}</Typography>
          <Typography>Topics to practice: {selectedContract.topics}</Typography>
          <Typography>Topics to practice: {selectedContract.type}</Typography>
        </Modal>
      )}
    </div>
  );
};
