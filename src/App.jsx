import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // Import the RegisterForm component
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';
import BulkDelete from './components/BulkDelete';

function App() {
  const token = localStorage.getItem("jwt")
  const [loggedIn, setLoggedIn] = useState(token != "" ? true : false)

  return (
    <Router>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={loggedIn ? <Outlet /> : <LoginForm setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/list-tasks" element={loggedIn ? <TaskList /> : <Navigate to="/" />} />
          <Route path="/create-task" element={loggedIn ? <CreateTaskForm /> : <Navigate to="/" />} />
          <Route path="/bulk-delete" element={loggedIn ? <BulkDelete /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
