// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Form, Input, Button, Typography, notification } from "antd";

// const { Title } = Typography;

// function CustomerSignupLogin() {
//   const [isLogin, setIsLogin] = useState(true); // Track whether the user is on the login or signup form
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [customerId, setCustomerId] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isLogin
//       ? "http://localhost:5000/api/customer/login"
//       : "http://localhost:5000/api/customer/create-customer";
    
//     const data = isLogin
//       ? { username, password }
//       : { username, password, customerId };

//     try {
//       const response = await axios.post(url, data);

//       if (response.status === 200 || response.status === 201) {
//         notification.success({
//           message: isLogin ? "Login Successful" : "Signup Successful",
//           description: isLogin
//             ? "You have logged in successfully!"
//             : "You have signed up successfully!",
//         });

//         setTimeout(() => {
//           // Redirect to the dashboard or home page after successful login/signup
//           navigate("/TicketPage");
//         }, 2000);
//       }
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: error.response?.data?.message || "An error occurred.",
//       });
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
//       <Title level={2} style={{ textAlign: "center" }}>
//         {isLogin ? "Customer Login" : "Customer Signup"}
//       </Title>
//       <Form onFinish={handleSubmit}>
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[{ required: true, message: "Please input your username!" }]}
//         >
//           <Input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Item>
//         {!isLogin && (
//           <Form.Item
//             label="Customer ID"
//             name="customerId"
//             rules={[{ required: true, message: "Please input your customer ID!" }]}
//           >
//             <Input
//               type="text"
//               value={customerId}
//               onChange={(e) => setCustomerId(e.target.value)}
//             />
//           </Form.Item>
//         )}
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             {isLogin ? "Login" : "Sign Up"}
//           </Button>
//         </Form.Item>
//       </Form>
//       <div style={{ textAlign: "center", marginTop: "10px" }}>
//         <Button type="link" onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default CustomerSignupLogin;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, notification } from "antd";

const { Title } = Typography;

function CustomerSignupLogin() {
  const [isLogin, setIsLogin] = useState(true); // Track whether the user is on the login or signup form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // `values` will contain the form data when using Ant Design's `onFinish`
    const url = isLogin
      ? "http://localhost:5000/api/customer/login"
      : "http://localhost:5000/api/customer/create-customer";
    
    const data = isLogin
      ? { username: values.username, password: values.password }
      : { username: values.username, password: values.password, customerId: values.customerId };

    try {
      const response = await axios.post(url, data);

      if (response.status === 200 || response.status === 201) {
        notification.success({
          message: isLogin ? "Login Successful" : "Signup Successful",
          description: isLogin
            ? "You have logged in successfully!"
            : "You have signed up successfully!",
        });

        setTimeout(() => {
          // Redirect to the dashboard or home page after successful login/signup
          navigate("/TicketPage");
        }, 2000);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "An error occurred.",
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {isLogin ? "Customer Login" : "Customer Signup"}
      </Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            label="Customer ID"
            name="customerId"
            rules={[{ required: true, message: "Please input your customer ID!" }]}
          >
            <Input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button type="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </Button>
      </div>
    </div>
  );
}

export default CustomerSignupLogin;
