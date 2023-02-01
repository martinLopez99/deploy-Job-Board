
const express = require('express')
const app = express()
const routes = require('./routes');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.json());

//set the path for express.js
const path = require('path');



//set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'))
app.use('/', routes);


app.put('/Jobs.json', (req, res) => {
    // Read existing data from JSON file
    fs.readFile(path.join(__dirname, 'public', 'Jobs.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read job data' });
        } else {
            // Parse the data to an object
            const jobData = JSON.parse(data);
            // Update the data with the new data
            jobData.push(req.body);
            // Write the updated data back to the file
            fs.writeFile(path.join(__dirname, 'public', 'Jobs.json'), JSON.stringify(jobData), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to update job data' });
                } else {
                    res.json({ message: 'Job data updated successfully' });
                }
            });
        }
    });
});




/* app.post('/Jobs.json', (req, res) => {
    // The request body will be available in req.body
    const jobData = req.body;
    // Write the job data to a JSON file
    fs.writeFile(path.join(__dirname, 'public', 'Jobs.json'), JSON.stringify(jobData), 'utf8', (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save job data' });
        } else {
            res.json({ message: 'Job data saved successfully' });
        }
    });
});
 */


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(3000, () => console.log('Server started on port 3000'))

