// Login.js
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../assets/styles/style.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
            navigate('/home');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="cardContainer">
            <Card className="card">
                <CardContent className="cardContent" sx={{ fontWeight: 'bold' }}>
                    <div className="loginContent">
                        <div className="rightContent">
                            {loggedIn ? (
                                <Typography variant="h5" className="heading-login bold-text">
                                    Welcome, Admin!
                                </Typography>
                            ) : (
                                <Card className="card-form">
                                    <CardContent className="centered-content">
                                        <Typography gutterBottom variant="h5" component="div" className="heading-login bold-text">
                                            Login
                                        </Typography>
                                        <div style={{ marginBottom: '10px' }}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Username"
                                                variant="outlined"
                                                fullWidth
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="filled-password-input"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                variant="filled"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ padding: 10 }}>
                                            <Button variant="contained" onClick={handleLogin}>
                                                Login
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
