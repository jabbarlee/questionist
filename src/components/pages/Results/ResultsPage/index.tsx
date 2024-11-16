import React from 'react';
import Header from "@/components/ui/_wrappers/Header";
import Main from '@/components/ui/_wrappers/Main'
import Footer from '@/components/ui/_wrappers/Footer'
import Page from '@/components/ui/_wrappers/Page'
import PageWrapper from '@/components/ui/_wrappers/Page/PageWrapper'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'

export default function Index() {

    return (
        <PageWrapper>
            <Page>
                <Header>
                    <Text heading={true}>Past tests results</Text>
                </Header>
                <Main>
                    <p>asdf</p>
                </Main>
                <Footer>
                    <Button buttonType='primary'>
                        DOS
                    </Button>
                </Footer>
            </Page>
        </PageWrapper>
    );
}
