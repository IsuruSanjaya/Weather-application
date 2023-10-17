import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../assets/styles/style.css';
import sideimg from '../assets/images/weather.jpg';

export default function Login() {
    return (
        <div className="cardContainer">
            <Card className="card">
                <CardContent className="cardContent" sx={{ fontWeight: "bold" }}>
                    <div className="loginContent">
                        <div className="rightContent">
                
                            <Card className="card-form">
                                <CardContent className="centered-content">
                                <Typography gutterBottom variant="h5" component="div" className='heading-login bold-text'>
                                Login
                            </Typography>
                                    <div style={{ marginBottom: '10px' }}>
                                        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth />
                                    </div>
                                    <div>
                                        <TextField
                                            id="filled-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="filled"
                                        />
                                    </div>
                                    <div style={{ padding: 10 }}>
                                        <Button variant="contained">Login</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
