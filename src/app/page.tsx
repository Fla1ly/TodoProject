'use client';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import Alert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';

const drawerWidth = 240;

import { Theme } from '@mui/material/styles';
import { Padding } from '@mui/icons-material';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  theme: Theme; open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));



interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


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
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [rows, setRows] = React.useState<TodoRow[]>([]);
  const [todoId, setTodoId] = React.useState<number>(0);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [showAlertDelete, setShowAlertDelete] = React.useState<boolean>(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

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
      setShowAlertDelete(true);
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
    setShowAlert(true);
    setTodos((oldTodos) => [...oldTodos, newTodo]);
    setRows(newRows);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    setTodoId((prevTodoId) => prevTodoId + 1);
    setTitle('');
    setDescription('');
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Roboto' }}>
      <CssBaseline />
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            To do list
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['All', 'Kanban', 'Archive', 'Pending'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <Link href="/" style={{ color: '#fff' }}><AssignmentRoundedIcon /></Link>}
                  {index === 1 && <Link href="/kanban" style={{ color: '#fff' }}><ViewKanbanRoundedIcon /></Link>}
                  {index === 2 && <Link href="/kanban" style={{ color: '#fff' }}><InboxIcon /></Link>}
                  {index === 3 && <Link href="/kanban" style={{ color: '#fff' }}><PendingActionsRoundedIcon /></Link>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {showAlert && (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Todo added!
          </Alert>
        </Snackbar>
      )}
      {showAlertDelete && (
        <Snackbar open={showAlertDelete} autoHideDuration={6000} onClose={() => setShowAlertDelete(false)}>
          <Alert severity="error" onClose={() => setShowAlertDelete(false)}>
            Todo deleted!
          </Alert>
        </Snackbar>
      )}
      <Stack sx={{ paddingTop: '10%' }}>
        {todos.length === 0 ? (
          <>
            <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h4'>No todos</Typography>
              <CircularProgress />
              <Button variant='contained' onClick={handleOpen}>Add todo  <AddTaskRoundedIcon /></Button>
            </Stack>
          </>
        ) : (
          <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={[
                  ...columns,
                  {
                    field: 'actions',
                    headerName: 'Delete',
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
                disableRowSelectionOnClick
              />
            </Box>
            <Button variant='contained' onClick={handleOpen}>Add todo  <AddTaskRoundedIcon /></Button>
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

    </Stack >
  );
}

export default Home;
