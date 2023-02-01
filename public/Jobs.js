// Get references to the form elements
const keywordsInput = document.getElementById('keywords');
const locationInput = document.getElementById('location');
const searchButton = document.getElementById('filter-button');
const jobList = document.getElementById('job-list');
let counter = 0;

// Displays all jobs on the list.

fetch('./Jobs.json')
    .then(response => response.json())
    .then(jobs => {
        const jobList = document.getElementById('job-list');
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h3>${job.title}</h3>
            <p> <strong>Company</strong>: ${job.company}</p>
            <p> <strong>Description</strong>: ${job.description}</p>
            <p> <strong>Location</strong>: ${job.location}</p>
            <p> <strong>Salary</strong>: ${job.salary}</p>
            <button type="button" class="btn btn-dark" id = "apply-button">Apply</button>
            <button type="button" class="btn btn-info" id = "${counter}">More Info</button>
        `;
            localStorage.setItem('job-' + counter, JSON.stringify(job));
            jobList.appendChild(li);
            counter++;
        });
    })
    .then(() => {
        const applyButton = document.querySelectorAll('.btn-dark');
        for (let i = 0; i < applyButton.length; i++) {
            applyButton[i].addEventListener('click', function (event) {
                location.replace('/apply');
            });
        }
    })
    .then(() => {
        const moreInfo = document.querySelectorAll('.btn-info');
        for (let i = 0; i < moreInfo.length; i++) {
            moreInfo[i].addEventListener('click', function (event) {
                storedJob = JSON.parse(localStorage.getItem('job-' + i));
                localStorage.setItem('job', JSON.stringify(storedJob));
                location.replace('/moreInfo');
            });
        }
    });



// Add an event listener to the search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // prevent the form from submitting

    // Get the values of the keywords and location inputs
    const keywords_search = keywordsInput.value.toLowerCase();
    const location_search = locationInput.value.toLowerCase();
    jobList.innerHTML = '';

    fetch('./Jobs.json')
        .then(response => response.json())
        .then(jobs => {
            const jobList = document.getElementById('job-list');
            jobs.forEach(job => {

                const li = document.createElement('li');
                const boolResult = job.title.toLowerCase().includes(keywords_search) &&
                    job.location.toLowerCase().includes(location_search);

                if (boolResult) {
                    li.innerHTML = `
                <h3>${job.title}</h3>
                <p> <strong>Company</strong>: ${job.company}</p>
                <p> <strong>Description</strong>: ${job.description}</p>
                <p> <strong>Location</strong>: ${job.location}</p>
                <p> <strong>Salary</strong>: ${job.salary}</p>
                <button type="button" class="btn btn-dark" id = "apply-button">Apply</button>
                <button type="button" class="btn btn-info" id = "${counter}">More Info</button>
            `;
                    localStorage.setItem('job-' + counter, JSON.stringify(job));
                    jobList.appendChild(li);
                    counter++;
                }
            });
        })
        .then(() => {
            const applyButton = document.querySelectorAll('.btn-dark');
            for (let i = 0; i < applyButton.length; i++) {
                applyButton[i].addEventListener('click', function (event) {
                    location.replace('/apply');
                });
            }
        })
        .then(() => {
            const moreInfo = document.querySelectorAll('.btn-info');
            for (let i = 0; i < moreInfo.length; i++) {
                moreInfo[i].addEventListener('click', function (event) {
                    storedJob = JSON.parse(localStorage.getItem('job-' + moreInfo[i].id));
                    localStorage.setItem('job', JSON.stringify(storedJob));
                    location.replace('/moreInfo');
                });
            }
        });
});






