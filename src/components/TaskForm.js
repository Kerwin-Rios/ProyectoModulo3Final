import React from 'react';
import { List, Button, Space, Typography } from 'antd';

const { Text } = Typography;

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

export default TaskItem;