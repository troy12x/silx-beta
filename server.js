const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Define API user key

// POST endpoint to fetch organization data
app.post('/api/organizations', async (req, res) => {
    try {
        const options = {
            method: 'POST',
            url: 'https://crunchbase-crunchbase-v1.p.rapidapi.com/searches/organizations',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.rapidAPIKey,
                'X-RapidAPI-Host': 'crunchbase-crunchbase-v1.p.rapidapi.com'
            },
            data: {
                field_ids: [
                    'identifier',
                    'location_identifiers',
                    'short_description',
                    'rank_org',
                    'image_url'
                ],
                limit: 50,
                order: [
                    {
                        field_id: 'rank_org',
                        sort: 'asc'
                    }
                ],
                query: [
                    {
                        field_id: 'location_identifiers',
                        operator_id: 'includes',
                        type: 'predicate',
                        values: [
                            '6106f5dc-823e-5da8-40d7-51612c0b2c4e'
                        ]
                    },
                    {
                        field_id: 'facet_ids',
                        operator_id: 'includes',
                        type: 'predicate',
                        values: ['company']
                    }
                ]
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const listener = app.listen(process.env.PORT || 3001, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
