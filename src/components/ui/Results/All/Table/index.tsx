import { Space, Table, Tag, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllResults } from '@/actions/firebase/getDoc';
import Link from 'next/link';

const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    name: string;
    duration: string;
    date: string;
    axpPoints: number;
    brilliantPoints: number;
    difficulty: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'age',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'address',
    },
    {
        title: 'AXP',
        dataIndex: 'axpPoints',
        key: 'axpPoints',
    },
    {
        title: 'Brilliants',
        dataIndex: 'brilliantPoints',
        key: 'brilliantPoints',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { difficulty }) => (
            <>
                {difficulty.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Hard') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link href={'/results/' + record.name}>View</Link>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Session 1',
        duration: '30 mins',
        date: '2023-10-01',
        axpPoints: 50,
        brilliantPoints: 20,
        difficulty: ['Easy'],
    },
    {
        key: '2',
        name: 'Session 2',
        duration: '45 mins',
        date: '2023-10-02',
        axpPoints: 70,
        brilliantPoints: 30,
        difficulty: ['Medium', 'Hard'],
    },
    {
        key: '3',
        name: 'Session 3',
        duration: '60 mins',
        date: '2023-10-03',
        axpPoints: 100,
        brilliantPoints: 50,
        difficulty: ['Hard'],
    },
];

export default function Index() {

    return (
        <Table<DataType> columns={columns} dataSource={data} style={{ width: '100%' }} bordered={true}/>
    )
}