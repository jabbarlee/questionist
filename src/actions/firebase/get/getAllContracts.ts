import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ContractProps } from "@/types";

export const getAllContracts = async (): Promise<ContractProps[]> => {
    const contractsRef = collection(db, "contracts");

    const querySnapshot = await getDocs(contractsRef);

    if (querySnapshot.empty) {
        console.error("No contracts found");
        return [];
    }

    const contracts: ContractProps[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as ContractProps), // Type assertion to enforce structure
    }));

    return contracts;
};
