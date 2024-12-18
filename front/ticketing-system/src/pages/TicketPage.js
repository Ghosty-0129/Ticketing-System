import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Input, message, Row, Col } from "antd";

function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const [amount, setAmount] = useState(0);

  // Fetch ticket pool from the API
  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ticketpool/ticketPool");
      setTickets(response.data.tickets);
    } catch (error) {
      message.error("Failed to fetch tickets.");
    }
  };

  // Remove tickets from the pool using the removeTickets API
  const buyTickets = async (vendorId) => {
    const ticketCount = parseInt(amount, 10);

    if (ticketCount <= 0) {
      message.error("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/ticketpool/removeTickets", {
        vendorId,
        ticketCount,
      });

      message.success(response.data.message);
      fetchTickets(); // Re-fetch the updated ticket pool
    } catch (error) {
      message.error("Failed to buy tickets.");
    }
  };

  useEffect(() => {
    fetchTickets(); // Fetch tickets when the component mounts
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ticket Pool</h1>

      {/* Display tickets */}
      <Row gutter={[16, 16]}>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <Col span={8} key={index}>
              <Card
                title={`Vendor: ${ticket.vendorId}`}
                bordered={false}
                style={{ width: "100%" }}
              >
                <p>Ticket Count: {ticket.ticketCount}</p>

                {/* Amount Input and Buy Button */}
                <Input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter number of tickets"
                  style={{ marginBottom: "10px" }}
                />
                <Button
                  type="primary"
                  onClick={() => buyTickets(ticket.vendorId)}
                  style={{ width: "100%" }}
                >
                  Buy Tickets
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </Row>
    </div>
  );
}

export default TicketPage;
