import { getCookie } from '@/utils/getCookie'
import React from 'react'

export default async function page() {
  const session = await getCookie('session');
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session}</p>
    </div>
  )
}
