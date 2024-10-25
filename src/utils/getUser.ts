import { cookies } from "next/headers";
import { verifySession } from "@/utils/firebase/verifySession";
import { getCookie } from "@/utils/getCookie";

export const getUser = async () => {
    const session = await getCookie('session');
    const user = await verifySession(session);

    if(!user){
        return ({ success: false, error: 'Unauthorized' });
    }

    return ({ success: true, user });
}