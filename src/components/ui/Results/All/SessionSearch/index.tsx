import React from 'react';
import styles from './index.module.css';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space } from 'antd';

const { Option } = Select;

const selectAfter = (
    <Select defaultValue="Sort by">
        <Option value="latest">Latest first</Option>
        <Option value="highest-score">Highest score</Option>
        <Option value="lowest-score">Lowest score</Option>
    </Select>
);


const SessionSearch = () => {

    return (
        <Input
            addonAfter={selectAfter}
            placeholder="Search a session"
            size={"large"}
            allowClear
            style={{ width: "100%" }}
        />
    );
};

export default SessionSearch;