import React from 'react'
import Page from "@/components/ui/_wrappers/Page";
import Header from "@/components/ui/_wrappers/Header";

export default function index({ id }: { id: string }) {
    return (
        <Page>
            <Header>
                Results for session {id}
            </Header>
        </Page>
    )
}
