'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import '@fontsource/roboto'
import './styling/main.css'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';
import { Theme } from '@mui/material/styles';

const drawerWidth = 240;


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



















export default function Home() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [showAlertDelete, setShowAlertDelete] = React.useState<boolean>(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, description }
      await fetch(`http://localhost:3000/api/addTodo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
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
      <Button variant='contained' onClick={handleOpen}>Add todo  <AddTaskRoundedIcon /></Button>
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
    </Stack >
    
  );
}
