import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

function TaskList() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map(task => (
          <Card key={task.id} className="mb-3">
            <CardBody>
              <CardTitle>{task.name}</CardTitle>
            </CardBody>
          </Card>
        ))
      )}
      <div className="mt-3">
        <Link to="/create-task">
          <Button color="primary">Create Task</Button>
        </Link>
        <Link to="/bulk-delete">
          <Button color="danger" className="ml-2">Delete Bulk</Button>
        </Link>
      </div>
    </div>
  );
}

export default TaskList;
