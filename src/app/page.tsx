'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import '@fontsource/roboto'
import './styling/main.css'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


interface TodoRow {
  id: number;
  title: string;
  description: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: false,
  },
];

let todoId: number = 0;

interface Todo {
  id: number;
  title: string;
  description: string;
}

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

const Home: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [rows, setRows] = React.useState<TodoRow[]>([]);
  const [todoId, setTodoId] = React.useState<number>(0);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
      setRows(parsedTodos.map((todo: Todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
      })));
    }
  }, []);

  const deleteTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      const updatedRows = rows.filter((row) => row.id !== id);

      setTodos(updatedTodos);
      setRows(updatedRows);

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    [todos, rows]
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const newTodo = { id: todoId, title, description };
    const newRows = [...rows, { id: todoId, title: newTodo.title, description: newTodo.description }];

    setTodos((oldTodos) => [...oldTodos, newTodo]);
    setRows(newRows);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    setTodoId((prevTodoId) => prevTodoId + 1);
    setTitle('');
    setDescription('');
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Roboto' }}>
      <Typography variant='h1' sx={{}}>To do list</Typography>
      <Button variant='contained' onClick={handleOpen}>Add todo</Button>
      <Stack>
        {todos.length === 0 ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={[
                  ...columns,
                  {
                    field: 'actions',
                    headerName: 'Actions',
                    width: 120,
                    renderCell: (params) => (
                      <div>
                        <IconButton onClick={() => deleteTodo(params.row.id)}>
                          <DeleteIcon sx={{ fontSize: 20, color: 'red' }} />
                        </IconButton>
                      </div>
                    ),
                  },
                ]}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </Stack>
        )}
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
              <TextField id="outlined-basic" label="description" variant="outlined" onChange={e => setDescription(e.target.value)} />
              <Button variant='contained' onClick={handleSubmit}>Add</Button>
            </Stack>
          </Box>
        </Modal>
      </Stack>

    </Stack>
  );
}



export default Home;
