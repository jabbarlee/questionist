import React from 'react'
import styles from './index.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import { ChipProps } from './types'

export default function Chip({
                                 children,
                                 onClear
                             } : ChipProps) {
    return (
        <div className={styles.chipWrapper}>
            <p className={styles.text}>{children}</p>
            {onClear && <ClearIcon fontSize='small' onClick={onClear} className={styles.clearIcon}/>}
        </div>
    )
}