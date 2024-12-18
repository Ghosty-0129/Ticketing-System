import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { AppstoreAddOutlined, SearchOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const location = useLocation();

  // Assuming you have a method to check if the user is an admin (you can modify this logic based on your authentication)
  const isAdmin = true; // Replace with actual admin check (e.g., check localStorage or useContext)

  return (
    <Header style={styles.navBar}>
      <div style={styles.logo}>
        <Title level={3} style={{ color: "white" }}>Ticket Management</Title>
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/selection" icon={<AppstoreAddOutlined />}>
          <Link to="/selection" style={styles.navLink}>Selection</Link>
        </Menu.Item>
        <Menu.Item key="/ticketPage" icon={<SearchOutlined />}>
          <Link to="/ticketPage" style={styles.navLink}>TicketPage</Link>
        </Menu.Item>

        {/* Conditionally render the Admin link */}
        {isAdmin && (
          <Menu.Item key="/admin" icon={<TeamOutlined />}>
            <Link to="/admin" style={styles.navLink}>Admin</Link>
          </Menu.Item>
        )}

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <Link to="/logout" style={styles.navLink}>Logout</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const styles = {
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: "0 20px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
  },
};

export default NavBar;
