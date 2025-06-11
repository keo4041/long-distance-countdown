// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// --- API ROUTES ---
// NEW ROUTE: Get weather for a specific city
app.get('/api/weather/:city', async (req, res) => {
    const weatherApiKey = process.env.OPENWEATHER_API_KEY;
    const { city } = req.params;
    if (!weatherApiKey) {
        return res.status(500).json({ message: 'Weather API key is not configured.' });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {
        const apiRes = await fetch(weatherUrl);
        if (!apiRes.ok) throw new Error(`OpenWeather Error: ${await apiRes.text()}`);
        const data = await apiRes.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


// ROUTE 1: Find the flight and get its ID
app.get('/api/find-flight', async (req, res) => {
    const apiKey = process.env.REACT_APP_FLIGHTAWARE_API_KEY;
    console.log(`Using API Key: ${apiKey ? 'Configured' : 'Not Configured'}`);
    
    if (!apiKey) {
        return res.status(500).json({ message: 'API key is not configured.' });
    }

    const airlineCode = 'ETH';
    const origin = 'JFK';
    const destination = 'LFW';
    const findUrl = `https://aeroapi.flightaware.com/aeroapi/flights/search?query=-origin+${origin}+-destination+${destination}`;

    try {
        const apiRes = await fetch(findUrl, { headers: { 'x-apikey': apiKey, 'Accept': 'application/json' } });
        if (!apiRes.ok) throw new Error(`FlightAware Error: ${await apiRes.text()}`);

        const data = await apiRes.json();
        const flight = data.flights?.[0];

        if (!flight) return res.status(404).json({ message: 'No matching flight found.' });

        // Return the entire flight object, which includes the fa_flight_id
        res.status(200).json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ROUTE 2: Get the live position for a specific flight ID
app.get('/api/flight-position/:id', async (req, res) => {
    const apiKey = process.env.FLIGHTAWARE_API_KEY;
    const { id } = req.params;
    if (!apiKey) {
        return res.status(500).json({ message: 'API key is not configured.' });
    }

    const positionUrl = `https://aeroapi.flightaware.com/aeroapi/flights/${id}/position`;

    try {
        const apiRes = await fetch(positionUrl, { headers: { 'x-apikey': apiKey } });
        if (!apiRes.ok) throw new Error(`FlightAware Error: ${await apiRes.text()}`);

        const data = await apiRes.json();
        // The position data is in an array, we want the latest one
        res.status(200).json(data.positions?.[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// --- SERVE REACT APP ---
// This serves the built React app
app.use(express.static(path.join(__dirname, 'build')));

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});