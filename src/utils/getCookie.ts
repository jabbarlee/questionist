"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
    const cookie = cookies().get(name)?.value;

    if (!cookie) return 'undefined';
    return cookie;
};