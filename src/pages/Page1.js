import React, { useState, useEffect } from 'react';
import {Layout, Typography, List} from 'antd';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

const { Header, Content } = Layout;
const { Title } = Typography;

const Page1 = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, time) => {
    const newTask = { id: Date.now(), text, time, completed: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  return (
      <Layout className="layout">
      <Header className="header">
        <Title style={{ color: 'white', margin: 0 }} level={2}>
          Lista de Tareas
        </Title>
      </Header>
      <Content className="content">
        <TaskForm addTask={addTask} />
        <List
          dataSource={tasks}
          renderItem={task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          )}
        />
      </Content>
    </Layout>
  );
};

export default Page1;
