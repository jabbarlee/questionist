import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import contractsData from "@/data/contractsData.json";

export const storeContracts = async () => {
    try {
        for (const contract of contractsData) {
            const contractRef = doc(db, 'contracts', contract.contractID);
            await setDoc(contractRef, contract);
        }

    } catch (error) {
        console.error("Error storing user info in Firestore: ", error);

        return { success: false, error: 'We are having trouble signing you up' };
    }
};