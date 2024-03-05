// 'use client';
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import { Typography, TextField } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import Modal from '@mui/material/Modal';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useState, useEffect } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import './styling/main.css'
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import '@fontsource/roboto'

// const TodoList = () => {
//     const [todos, setTodos] = React.useState<Todo[]>([]);
//     useEffect(() => {
//         const storedTodos = localStorage.getItem('todos');
//         if (storedTodos) {
//             setTodos(JSON.parse(storedTodos));
//         }
//     }, []);

//     return (
//         <Stack>
//             {todos.length === 0 ? <CircularProgress /> : todos.map((todo: Todo) => (

//                 <li key={todo.id}>{todo.title}</li>
//             ))}
//         </Stack>
//     )
// }

// export default TodoList;