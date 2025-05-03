import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';

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

export default TaskForm;