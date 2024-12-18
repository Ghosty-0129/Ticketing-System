import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Typography } from "antd";

const { Title } = Typography;

function SelectionPage() {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div style={styles.container}>
      <Title level={2} style={{ textAlign: "center" }}>
        Selection Page
      </Title>

      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/vendorLog")}
            style={styles.button}
          >
            Vendor
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/customerLog")}
            style={styles.button}
          >
            Customer
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
  },
  button: {
    width: "200px",
    fontSize: "16px",
    padding: "10px",
  },
};

export default SelectionPage;
