"use client";

import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { ContractCard } from "@/components/ui/Contracts/ContractCard";
import { ContractProps } from "@/types";
import { getAllContracts } from "@/actions/firebase/get/getAllContracts";

export const ContractPage = () => {
  const [contracts, setContracts] = useState<ContractProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className={styles.contractContainer}>
      <div className={styles.contractsContainer}>
        {contracts.map((contract, index) => (
          <ContractCard key={index} contract={contract} />
        ))}
      </div>
    </div>
  );
};
