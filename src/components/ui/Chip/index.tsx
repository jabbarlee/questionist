import React from 'react'
import styles from './index.module.css'
import Text from '@/components/ui/Text'
import ClearIcon from '@mui/icons-material/Clear';

export interface ChipProps {
    children: React.ReactNode;
    onClear?: () => void;
}

export default function Chip({
    children,
    onClear
} : ChipProps) {
  return (
    <div className={styles.chipWrapper}>
        <Text>{children}</Text>
        {onClear && <ClearIcon fontSize='small' onClick={onClear} className={styles.clearIcon}/>}
    </div>
  )
}

