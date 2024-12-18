import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Spin, notification } from 'antd';

const ConfigPage = () => {
    const [config, setConfig] = useState({
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        maxTicketCapacity: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/config/config')
            .then((response) => {
                setConfig(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching config data');
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/api/config/config", config)
            .then((response) => {
                notification.success({
                    message: 'Config updated successfully!',
                });
                navigate("/selection"); 
            })
            .catch((error) => {
                setError('Error updating config');
                notification.error({
                    message: 'Error',
                    description: 'Failed to update config',
                });
            });
    };

    if (loading) return <Spin size="large" tip="Loading..." style={{ marginTop: '20px' }} />;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Config Page</h1>
            <Form onSubmitCapture={handleSubmit}>
    <Form.Item label="Total Tickets">
        <Input
            type="number"
            value={config.totalTickets}
            onChange={(e) => setConfig({ ...config, totalTickets: Number(e.target.value) })}
            required
        />
    </Form.Item>
    <Form.Item label="Ticket Release Rate">
        <Input
            type="number"
            value={config.ticketReleaseRate}
            onChange={(e) => setConfig({ ...config, ticketReleaseRate: Number(e.target.value) })}
            required
        />
    </Form.Item>
    <Form.Item label="Customer Retrieval Rate">
        <Input
            type="number"
            value={config.customerRetrievalRate}
            onChange={(e) => setConfig({ ...config, customerRetrievalRate: Number(e.target.value) })}
            required
        />
    </Form.Item>
    <Form.Item label="Max Ticket Capacity">
        <Input
            type="number"
            value={config.maxTicketCapacity}
            onChange={(e) => setConfig({ ...config, maxTicketCapacity: Number(e.target.value) })}
            required
        />
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" block>
            Save Config
        </Button>
    </Form.Item>
</Form>

        </div>
    );
};

export default ConfigPage;
