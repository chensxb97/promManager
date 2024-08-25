import { useState } from "react"
import { createQuery, editQuery } from "../apis/queries";
import { Button, Modal, Form, Input } from 'antd'
import "./index.css"

const CreateQuery = ({ editMode, record }) => {
    const [queryId] = useState(editMode ? record.id : "")
    const [query, setQuery] = useState(editMode ? record.query : "")
    const [description, setDescription] = useState(editMode ? record.description : "")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (e) => {
        e.preventDefault()
        let payload = {
            query,
            description
        }
        if (editMode) {
            payload = { queryId, ...payload }
            editQuery(payload)
        }
        else createQuery(payload)
        window.location.reload()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (e) => {
        console.log('Finished');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <>
            <div className="right-button">
                <Button className={editMode ? "edit-button" : "create-button"} type={editMode ? '' : 'primary'} onClick={() => showModal()}>{editMode ? `Edit` : `Create Record`}</Button>
            </div>
            <Modal
                title="User Submission Form"
                centered
                open={isModalOpen}
                okText="Submit"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    style={{
                        padding: '20px',
                        textAlign: 'center'
                    }}
                    initialValues={{
                        description: editMode ? record.description : '',
                        query: editMode ? record.query : ''
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Prometheus Query"
                        name="query"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a valid prometheus query!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setQuery(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}

export default CreateQuery;