import { getDocs, collection, doc } from "firebase/firestore"
import { db } from "@/config/firebase"

export const getAllContracts = async () => {
    const contractsRef = collection(doc(db, 'contracts'), 'contracts');

    const querySnapshot = await getDocs(contractsRef);

    if(querySnapshot.empty) {
        console.error("No contracts found");
        return null;
    }

    const contracts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return contracts;
}