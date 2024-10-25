import { getUser } from '@/utils/getUser'
import React from 'react'

export default async function page() {
  const { success, user } = await getUser();
  if (!success || !user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }
  const { decodedClaims } = user;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{decodedClaims?.uid}</p>
      <p>{decodedClaims?.email}</p>
    </div>
  )
}
