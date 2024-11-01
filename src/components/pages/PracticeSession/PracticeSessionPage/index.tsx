import React from 'react'
import Text from '@/components/ui/Text'

export default function index({
    sessionId
} : {
    sessionId: string
}) {
  return (
    <div>
        <Text heading={true}>Session {sessionId}</Text>
    </div>
  )
}
