import { verifySession } from '@/utils/firebase/verifySession';
import { getCookie } from '@/utils/getCookie'
import React from 'react'

export default async function page() {
  const session = await getCookie('session');
  const user = await verifySession(session);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user.decodedClaims?.uid}</p>
      <p>{user.decodedClaims?.exp}</p>
      <p>{user.decodedClaims?.email}</p>
    </div>
  )
}
