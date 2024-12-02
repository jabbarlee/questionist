import React from 'react'
import PracticeSession from '../../../../components/pages/PracticeSession'

export default function index({ params } : { params: { id: string } }) {
    const { id } = params;

    return (
        <div>
            <PracticeSession sessionId={id}/>
        </div>
    )
}
