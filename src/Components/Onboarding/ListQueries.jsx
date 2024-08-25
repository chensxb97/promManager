import { useState, useEffect } from "react"
import { getQueries, createQuery, deleteQuery } from "../apis/queries";
import CreateQuery from "./CreateQuery";
import { Table, Button } from 'antd'
import "./index.css"

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 150
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 300,
    },
    {
        title: 'Query',
        dataIndex: 'query',
        key: 'query',
        width: 1000
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <div className="actions">
                <CreateQuery editMode={true} record={record} />
                <Button className="clone-button" onClick={() => {
                    const { query, description } = record
                    let payload = {
                        query,
                        description
                    }
                    createQuery(payload)
                    window.location.reload()
                }}>
                    Clone
                </Button>
                <Button className="delete-button" onClick={() => {
                    deleteQuery(record.id);
                    window.location.reload();
                }}>
                    Delete
                </Button>
            </div >
        ),
        width: 10
    }
];

const ListQueries = () => {
    const [queries, setQueries] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQueries().then((data) => {
            setQueries(data);
            setLoading(false);
        })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Onboarding</h1>
            <p>You can manage your prometheus queries here.</p>
            <CreateQuery />
            <Table className="records-table" dataSource={queries || []} columns={columns} />
        </div>
    );
};

export default ListQueries;