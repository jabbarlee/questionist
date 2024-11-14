import React from 'react'
import Footer from '@/components/ui/_wrappers/Footer';
import Button from '@/components/ui/Button';
import ButtonTextWrapper from '@/components/ui/_wrappers/ButtonTextWrapper';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { handleSessionSubmit } from '@/actions/handleSessionSubmit';

export default function index({
    sessionId,
    questions,
    selectedChoices,
    setError,
    setMessage
} : {
    sessionId: string,
    questions: any[],
    selectedChoices: string[],
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
}) {
  return (
    <Footer>
        <Button buttonType='error'>
            <ButtonTextWrapper>
            <CancelOutlinedIcon fontSize='small'/>
            Exit
            </ButtonTextWrapper>
        </Button>
        <Button buttonType='secondary' onClick={async() => handleSessionSubmit({sessionId, questions, selectedChoices, setError, setMessage})}>
            <ButtonTextWrapper>
            <CheckIcon fontSize='small'/>
            Submit
            </ButtonTextWrapper>
        </Button>
    </Footer>
  )
}
