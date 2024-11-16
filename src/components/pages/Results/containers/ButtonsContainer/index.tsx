import React from 'react';
import Footer from '@/components/ui/_wrappers/Footer';
import Button from '@/components/ui/Button';
import ButtonTextWrapper from '@/components/ui/_wrappers/ButtonTextWrapper';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { handleSessionSubmit } from '@/actions/handleSessionSubmit';
import LinearProgress from '@mui/material/LinearProgress';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import styles from './index.module.css';
import Text from '@/components/ui/Text';

export default function Index({
    progress,
} : {
    progress: number,
}) {
  return (
    <Footer>
        <div className={styles.footerContent}>
            <div className={styles.progressContainer}>
                <Text subheading={true}>Scored {progress}%</Text>
                <LinearProgress color={progress === 100 ? 'success' : 'primary'} variant="determinate" value={progress} sx={{ width: '200px' }}/>
            </div>
            <div className={styles.buttonContainer}>
                <Button buttonType="primary">
                    <ButtonTextWrapper>
                        <AutoAwesomeIcon fontSize="small" />
                        Analyze
                    </ButtonTextWrapper>
                </Button>
                <Button
                    buttonType="secondary"
                >
                    <ButtonTextWrapper>
                        {/*<CheckIcon fontSize="small" />*/}
                        Exit
                    </ButtonTextWrapper>
                </Button>
            </div>
        </div>
    </Footer>
  );
}
