import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function LoginForm({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { jwt } = response.data;
      localStorage.setItem('jwt', jwt);
      navigate('/list-tasks');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit">Login</Button>
      <p className="mt-3">
        Don't have an account?{' '}
        <Link to="/register">Register</Link>
      </p>
    </Form>
  );
}

export default LoginForm;
