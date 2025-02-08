import React from 'react';
import styles from './index.module.css';
import { Input, Dropdown, Button, MenuProps, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

export const SearchHeader = () => {

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };
    
    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div className={styles.searchHeader}>
            <Input placeholder="Search for a contract..." size='large' className={styles.searchInput}/>
            <Dropdown menu={menuProps}>
                <Button variant='outlined' size='large'>
                    <Space>
                        Filter
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
}