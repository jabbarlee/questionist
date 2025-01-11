import React from 'react'
import InputWrapper from '@/components/pages/Signin/InputWrapper'
import styles from './index.module.css'
import Text from '@/components/ui/Text'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.loginForm}>
        <Text heading={true}>
          Welcome back 👋
        </Text>
        <InputWrapper />
        <Text link='/' subheading={true}>Forgot password?</Text>
        <Text link='/signup' subheading={true}>Create a new account</Text>
      </div>
    </div>
  )
}
