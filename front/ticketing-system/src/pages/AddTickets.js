// import React, { useState } from 'react';
// import axios from 'axios';
// import { Input, Button, Form, notification } from 'antd';

// const AddTickets = () => {
//     const [ticketCount, setTicketCount] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const vendorId = localStorage.getItem('vendorId'); // Retrieve vendorId from localStorage

//         if (!vendorId) {
//             setMessage('Vendor ID not found in local storage. Please log in again.');
//             return;
//         }

//         if (!ticketCount || ticketCount <= 0) {
//             setMessage('Please provide a valid ticket count.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:5000/api/ticketpool/addTickets', {
//                 vendorId,
//                 ticketCount: parseInt(ticketCount, 10),
//             });

//             notification.success({
//                 message: 'Tickets Added Successfully',
//                 description: response.data.message,
//             });
//             setTicketCount('');
//         } catch (error) {
//             notification.error({
//                 message: 'Error Adding Tickets',
//                 description: error.response?.data?.message || 'An error occurred while adding tickets.',
//             });
//         }
//     };

//     return (
//         <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//             <h2 style={{ textAlign: 'center' }}>Add Tickets</h2>
//             <Form onFinish={handleSubmit} layout="vertical">
//                 {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
//                 <Form.Item
//                     label="Ticket Count"
//                     name="ticketCount"
//                     rules={[{ required: true, message: 'Please enter a valid ticket count' }]}
//                 >
//                     <Input
//                         type="number"
//                         value={ticketCount}
//                         onChange={(e) => setTicketCount(e.target.value)}
//                         placeholder="Enter ticket count"
//                         min={1}
//                     />
//                 </Form.Item>
//                 <Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         Add Tickets
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default AddTickets;


import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Form, notification } from 'antd';

const AddTickets = () => {
    const [ticketCount, setTicketCount] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission with Ant Design's onFinish
    const handleSubmit = async (values) => {
        const { ticketCount } = values; // Get ticketCount from the form values

        const vendorId = localStorage.getItem('vendorId'); // Retrieve vendorId from localStorage

        if (!vendorId) {
            setMessage('Vendor ID not found in local storage. Please log in again.');
            return;
        }

        if (!ticketCount || ticketCount <= 0) {
            setMessage('Please provide a valid ticket count.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/ticketpool/addTickets', {
                vendorId,
                ticketCount: parseInt(ticketCount, 10),
            });

            notification.success({
                message: 'Tickets Added Successfully',
                description: response.data.message,
            });
            setTicketCount(''); // Clear the ticket count input
        } catch (error) {
            notification.error({
                message: 'Error Adding Tickets',
                description: error.response?.data?.message || 'An error occurred while adding tickets.',
            });
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Add Tickets</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
                <Form.Item
                    label="Ticket Count"
                    name="ticketCount"
                    rules={[{ required: true, message: 'Please enter a valid ticket count' }]}
                >
                    <Input
                        type="number"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(e.target.value)}
                        placeholder="Enter ticket count"
                        min={1}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Tickets
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddTickets;
