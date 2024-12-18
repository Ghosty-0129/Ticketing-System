// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Form, Input, Button, Typography, notification } from "antd";

// const { Title } = Typography;

// function VendorSignupLogin() {
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     vendorId: "", // Only required for signup
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isSignup) {
//         // Signup API call
//         const response = await axios.post(
//           "http://localhost:5000/api/vendors/create-vendor",
//           {
//             username: formData.username,
//             password: formData.password,
//             vendorId: formData.vendorId,
//           }
//         );
//         notification.success({
//           message: "Signup Successful",
//           description: `Vendor ID: ${response.data.vendorId}`,
//         });
//       } else {
//         // Login API call
//         const response = await axios.post(
//           "http://localhost:5000/api/vendors/login",
//           {
//             username: formData.username,
//             password: formData.password,
//           }
//         );
//         notification.success({
//           message: "Login Successful",
//           description: `Welcome, ${response.data.vendor.username}`,
//         });
//         localStorage.setItem("vendorId", response.data.vendor.vendorId);
//         navigate("/addTickets");
//       }
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: error.response?.data?.message || "An error occurred. Please try again.",
//       });
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
//       <Title level={2} style={{ textAlign: "center" }}>
//         {isSignup ? "Vendor Signup" : "Vendor Login"}
//       </Title>
//       <Form onFinish={handleSubmit}>
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[{ required: true, message: "Please input your username!" }]}
//         >
//           <Input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </Form.Item>
//         {isSignup && (
//           <Form.Item
//             label="Vendor ID"
//             name="vendorId"
//             rules={[{ required: true, message: "Please input your vendor ID!" }]}
//           >
//             <Input
//               type="text"
//               name="vendorId"
//               value={formData.vendorId}
//               onChange={handleChange}
//             />
//           </Form.Item>
//         )}
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             {isSignup ? "Signup" : "Login"}
//           </Button>
//         </Form.Item>
//       </Form>
//       <div style={{ textAlign: "center", marginTop: "10px" }}>
//         <Button type="link" onClick={() => setIsSignup(!isSignup)}>
//           Switch to {isSignup ? "Login" : "Signup"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default VendorSignupLogin;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, notification } from "antd";

const { Title } = Typography;

function VendorSignupLogin() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    vendorId: "", // Only required for signup
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission with Ant Design's onFinish
  const handleSubmit = async (values) => {
    try {
      if (isSignup) {
        // Signup API call
        const response = await axios.post(
          "http://localhost:5000/api/vendors/create-vendor",
          {
            username: values.username,
            password: values.password,
            vendorId: values.vendorId,
          }
        );
        notification.success({
          message: "Signup Successful",
          description: `Vendor ID: ${response.data.vendorId}`,
        });
      } else {
        // Login API call
        const response = await axios.post(
          "http://localhost:5000/api/vendors/login",
          {
            username: values.username,
            password: values.password,
          }
        );
        notification.success({
          message: "Login Successful",
          description: `Welcome, ${response.data.vendor.username}`,
        });
        localStorage.setItem("vendorId", response.data.vendor.vendorId);
        navigate("/addTickets");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {isSignup ? "Vendor Signup" : "Vendor Login"}
      </Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>
        {isSignup && (
          <Form.Item
            label="Vendor ID"
            name="vendorId"
            rules={[{ required: true, message: "Please input your vendor ID!" }]}
          >
            <Input
              type="text"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isSignup ? "Signup" : "Login"}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button type="link" onClick={() => setIsSignup(!isSignup)}>
          Switch to {isSignup ? "Login" : "Signup"}
        </Button>
      </div>
    </div>
  );
}

export default VendorSignupLogin;
