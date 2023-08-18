import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BulkDelete() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:5000/tasks/list-tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error.response.data.error);
      }
    }

    fetchTasks();
  }, []);

  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.post('http://localhost:5000/tasks/delete-bulk-tasks', { taskIds: selectedTasks }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Bulk delete successful');
      navigate('/list-tasks');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div>
      {tasks.map(task => (
        <Card key={task.id} className="mb-3">
          <CardBody>
            <CardTitle>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  {task.name}
                </Label>
              </FormGroup>
            </CardTitle>
          </CardBody>
        </Card>
      ))}
      <Button color="danger" onClick={handleDelete}>Delete Selected</Button>
    </div>
  );
}

export default BulkDelete;
