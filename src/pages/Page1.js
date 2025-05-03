import React, { useState, useEffect } from 'react';
import {Layout, Typography, List, Input, Form, Button, message, Space} from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Text } = Typography;

function TaskForm({ addTask }) {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (!text || !time) {
      message.error('¡Por favor ingresa una tarea y una hora!');
      return;
    }
    addTask(text, time);
    setText('');
    setTime('');
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} style={{ marginBottom: 20 }}>
      <Form.Item label="Tarea">
        <Input
          placeholder="Nueva tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Hora">
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Añadir Tarea
      </Button>
    </Form>
  );
}

function TaskItem({ task, toggleTask, removeTask }) {
  return (
    <List.Item
      style={{
        backgroundColor: task.completed ? '#d4ed91' : '#e9ecef',
        marginBottom: 8,
        borderRadius: 8,
        padding: 16,
      }}
      actions={[
        <Button type="primary" onClick={() => toggleTask(task.id)}>
          {task.completed ? 'Desmarcar' : 'Marcar'}
        </Button>,
        <Button danger onClick={() => removeTask(task.id)}>
          Remover
        </Button>,
      ]}
    >
      <Space direction="vertical">
        <Text strong delete={task.completed}>
          {task.text}
        </Text>
        <Text type="secondary">Hora: {task.time}</Text>
      </Space>
    </List.Item>
  );
}

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
