/* /pages/kanban.tsx */
'use strict';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import Container from '@mui/material/Container';


export default function Kanban() {
    return (
        <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h3" gutterBottom>
                    Kanban
                </Typography>
                <TextField id="standard-basic" label="Standard" />
            </Box>
        </Container>
    );
}