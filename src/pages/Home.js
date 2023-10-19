import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Icon, Paper, Grid } from '@mui/material';
import slideimg from '../assets/images/weather.jpg';
import Button from '@mui/material/Button';
import TodayIcon from '@mui/icons-material/Today';
import InfoIcon from '@mui/icons-material/Info';
import PrimarySearchAppBar from '../components/Navigation';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import axios from 'axios';

const Home = (icon) => {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherData3days, setWeatherData3days] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [city, setCity] = useState('Colombo');
    const [lan, setlan] = useState('');
    const [lon, setlon] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=cc370f32795aca269a0d9ec66322a81a`)
            setWeatherData(response.data);
            console.log(response.data); //You can see all the weather data in console log

            // Extract lan and lon from the response
            const { coord } = response.data;
            console.log(response.data.coord)
            const { lon, lat } = coord;

            // Call fetchDataweek with lon and lat values
            fetchDataweek(lon, lat);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const fetchDataweek = async (lon, lat) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cc370f32795aca269a0d9ec66322a81a`)
            setWeatherData3days(response.data);
            console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataweek();
    }, []);



    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };




    return (
        <>

            <div className='home-body'>

                <PrimarySearchAppBar />
                <Card sx={{ maxWidth: '100%', height: 300, position: 'relative' }}>
                    <CardActionArea>
                        <CardMedia component="img" height="300" image={slideimg} alt="Weather Image" />
                        <div className='card-widget-top' style={{ flex: '1', margin: '0 10px', maxWidth: '350px' }}>
                            <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Enter city name"
                                        value={city}
                                        onChange={handleInputChange}
                                    />
                                    <button type="submit">Get Weather</button>
                                </form>
                                {weatherData && (
                                    <>
                                        <Typography variant="h4" color="whitesmoke">
                                            Current weather
                                        </Typography>
                                        <Typography variant="h4" color="whitesmoke">
                                            <strong>
                                                {weatherData.name}, {weatherData.sys?.country}
                                            </strong>
                                        </Typography>
                                        <Typography variant="h6" color="whitesmoke">
                                            Humidity: {weatherData.main?.humidity}%
                                        </Typography>
                                        <Typography variant="h6" color="whitesmoke">
                                            {weatherData.main?.temp && (
                                                <>
                                                    Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C
                                                    <br />
                                                </>
                                            )}
                                        </Typography>
                                        <Button variant="contained" onClick={toggleDetails}>View more</Button>
                                    </>
                                )}
                            </CardContent>
                        </div>
                    </CardActionArea>
                </Card>
                <div>
                    {weatherData3days && (
                        <div>
                            <div className='days3-card'>

                                {weatherData3days.list
                                    .filter((dayData) => dayData.dt_txt.endsWith('15:00:00'))
                                    .slice(0, 3)
                                    .map((dayData, index) => {
                                        const date = new Date(dayData.dt_txt);
                                        const day = date.getDate();
                                        const month = date.getMonth() + 1;
                                        const temperatureCelsius = (dayData.main.temp - 273.15).toFixed(2);

                                        const cardStyles = {
                                            flex: '1',
                                            margin: '0 10px',
                                            maxWidth: '300px',
                                            marginBottom: '10px',
                                            borderRadius: '10px', // Rounded corners
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                                            backgroundColor: 'white',
                                            padding: '20px',
                                        };

                                        return (
                                            <div key={index} className='card-widget' style={cardStyles}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <hr />

                                                        <Typography variant='h6' color='textPrimary' style={{ display: 'flex', alignItems: 'center' }}>
                                                            <TodayIcon style={{ marginLeft: '10px' }} /> {`${day}/${month}`}
                                                        </Typography>

                                                        <Typography variant='h4' color='textPrimary' className='centeredText biggerText'>
                                                            {temperatureCelsius}°C
                                                        </Typography>

                                                        <Typography variant='body1' color='textPrimary'>
                                                            <strong>Humidity: {dayData.main.humidity}%</strong>
                                                        </Typography>

                                                        <Typography variant='body1' color='textPrimary'>
                                                            <strong>{dayData.weather[0].main}</strong>
                                                        </Typography>
                                                        <hr />
                                                    </CardContent>
                                                </CardActionArea>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>

                {showDetails && weatherData3days && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20 }}>
                            {weatherData3days.list
                                .filter((dayData) => dayData.dt_txt.endsWith('15:00:00'))
                                .slice(0, 7)
                                .map((dayData, index) => {
                                    // Parse the date string into a JavaScript Date object
                                    const date = new Date(dayData.dt_txt);

                                    // Get day and month
                                    const day = date.getDate();
                                    const month = date.getMonth() + 1; // Months are 0-indexed, so we add 1

                                    // Convert temperature from Kelvin to Celsius
                                    const temperatureCelsius = (dayData.main.temp - 273.15).toFixed(2); // Rounded to 2 decimal places

                                    return (
                                        <div key={index} className='card-widget-drop' style={{ flex: '1', margin: '0 10px', borderRadius: 5 }}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h6" color="textPrimary" style={{ display: 'flex', alignItems: 'center' }}>

                                                        <TodayIcon style={{ marginLeft: '10px' }} />{`${day}/${month}`}
                                                    </Typography>

                                                    <Typography variant="h4" color="textPrimary" className="centeredText biggerText">
                                                        {temperatureCelsius}°C
                                                    </Typography>

                                                    <hr />
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1" color="textPrimary">
                                                                min: {(dayData.main.temp_min - 273.15).toFixed(2)}°C
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1" color="textPrimary">
                                                                max: {(dayData.main.temp_max - 273.15).toFixed(2)}°C
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <hr />

                                                    <Typography variant="body1" color="textPrimary">
                                                        Humidity: {dayData.main.humidity}%
                                                    </Typography>
                                                    <hr />

                                                    <Typography variant="body1" color="textPrimary">
                                                        {dayData.weather[0].main} - {dayData.weather[0].description}
                                                    </Typography>
                                                    <hr />

                                                    <Typography variant="body1" color="textPrimary">
                                                        Wind Speed :{dayData.wind.speed}
                                                    </Typography>

                                                </CardContent>
                                            </CardActionArea>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default Home;
