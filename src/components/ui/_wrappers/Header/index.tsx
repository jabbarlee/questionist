"use client"

import React from 'react'
import styles from './index.module.css'
import { Dropdown } from 'antd'
import { MenuProps } from 'antd/lib/menu'

export default function ({ children } : { children: React.ReactNode }) {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('click left button', e);
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

  return (
      <div className={styles.header}>
          <div>
              <p className={styles.headerText}>{children}</p>
          </div>
          <div>
              <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                  amiljabbarlee@gmail.com
              </Dropdown.Button>
          </div>
      </div>
  )
}
