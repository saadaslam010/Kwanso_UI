import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreateTaskForm() {
  const [taskName, setTaskName] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post('http://localhost:5000/tasks/create-task', { name: taskName }, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      console.log(response.data);

      // Reset the state and navigate to the task list
      setTaskName('');
      navigate('/list-tasks');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Task Name</Label>
        <Input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit">Create Task</Button>
    </Form>
  );
}

export default CreateTaskForm;
