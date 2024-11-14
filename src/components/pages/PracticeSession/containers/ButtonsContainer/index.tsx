import React from 'react';
import Footer from '@/components/ui/_wrappers/Footer';
import Button from '@/components/ui/Button';
import ButtonTextWrapper from '@/components/ui/_wrappers/ButtonTextWrapper';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { handleSessionSubmit } from '@/actions/handleSessionSubmit';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './index.module.css';
import Text from '@/components/ui/Text';

export default function Index({
    sessionId,
    questions,
    selectedChoices,
    setError,
    progress,
    setMessage,
    handleNavigate
} : {
    sessionId: string,
    questions: any[],
    selectedChoices: string[],
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    progress: number,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>,
    handleNavigate: (url: string) => void
}) {
  return (
    <Footer>
        <div className={styles.footerContent}>
            <div className={styles.progressContainer}>
                <Text subheading={true}>{progress}%</Text>
                <LinearProgress color={progress === 100 ? 'success' : 'primary'} variant="determinate" value={progress} sx={{ width: '200px' }}/>
            </div>
            <div className={styles.buttonContainer}>
                <Button buttonType="error">
                    <ButtonTextWrapper>
                        <CancelOutlinedIcon fontSize="small" />
                        Exit
                    </ButtonTextWrapper>
                </Button>
                <Button
                    buttonType="secondary"
                    onClick={async () =>
                        handleSessionSubmit({
                            sessionId,
                            questions,
                            selectedChoices,
                            setError,
                            setMessage,
                            handleNavigate
                        })
                    }
                >
                    <ButtonTextWrapper>
                        <CheckIcon fontSize="small" />
                        Submit
                    </ButtonTextWrapper>
                </Button>
            </div>
        </div>
    </Footer>
  );
}
