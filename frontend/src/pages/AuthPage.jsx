import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/queries";
import { Form, Input, Button } from "antd";
import "../App.less";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const [login] = useMutation(LOGIN, {
    onCompleted: (result) => {
      const { token } = result.login;
      localStorage.setItem("jwtToken", token);
      history.push("/admin/dashboard");
    },
    variables: {
      email,
      password,
    },
  });
  const handleSubmit = (e) => {
    console.log(email);
    console.log(password);
    login();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        {...layout}
        style={{
          width: "500px",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input
            placeholder="admin@admin.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              min: 5,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="admin"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
