'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '@fontsource/roboto'
import './styling/main.css'

const style = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column' as 'column',
  FontFace: 'Roboto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

let todoId: number = 0;

interface Todo {
  id: number;
  title: string;
  subtitle: string;
}

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [subtitle, setSubtitle] = React.useState('');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const newTodo = { id: todoId++, title, subtitle };
    setTodos(oldTodos => [...oldTodos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    setTitle('');
    setSubtitle('');
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Roboto' }}>
      <Typography variant='h1' sx={{}}>To do list</Typography>
      <Button variant='contained' onClick={handleOpen}>Add todo</Button>
      <Stack>
        {todos.length === 0 ? <CircularProgress /> : todos.map((todo: Todo) => (
          <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <DeleteIcon sx={{ fontSize: 20, color: 'red' }}/> */}
            <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant='h5' sx={{ display: 'flex', flexDirection: 'row', fontFamily: 'Roboto' }} key={todo.id}> {todo.title} </Typography>
              <Typography variant='h6' sx={{ fontFamily: 'Roboto' }} key={todo.id}> {todo.subtitle} </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, fontFamily: 'Roboto' }}>
          <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h4' id="parent-modal-title">Add a todo task</Typography>
            <TextField value={title} id="outlined-basic" label="Title" variant="outlined" onChange={e => setTitle(e.target.value)} />
            <TextField id="outlined-basic" label="Subtitle" variant="outlined" onChange={e => setSubtitle(e.target.value)} />
            <Button variant='contained' onClick={handleSubmit}>Add</Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}
