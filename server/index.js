require('dotenv').config();

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const PORT = process.env.PORT;
const REDIRECT_URI = 'http://localhost:' + PORT + '/callback';

console.log(process.env.CLIENT_ID);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});

/**
 * Generates a random string containing numbers and letters to prevent CSRF attacks
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
// TODO More secure generation
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private playlist-modify-private user-top-read';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            if (response.status === 200) {
                const { access_token, refresh_token } = response.data;

                const queryParams = querystring.stringify({
                    access_token,
                    refresh_token,
                });

                res.redirect(`http://localhost:8080/?${queryParams}`);

            } else {
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
            }
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});