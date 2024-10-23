import React from 'react'
import styles from './index.module.css'
import Text from '@/components/ui/Text'
import InputWrapper from '@/components/pages/Signup/InputWrapper'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.signupForm}>
        <Text heading={true}>
          Sign up
        </Text>
        <InputWrapper />
        <Text subheading={true} link='/signin'>Already have an account?</Text>
      </div>
    </div>
  )
}
