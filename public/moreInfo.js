const job = JSON.parse(localStorage.getItem('job'));
const title = document.getElementById('title');
const company = document.getElementById('company');
const description = document.getElementById('description');
const location_city = document.getElementById('location');
const salary = document.getElementById('salary');
const job_type = document.getElementById('job_type');
const skills_required = document.getElementById('skills_required');
const experience = document.getElementById('experience');
const team_size = document.getElementById('team_size');
const benefits = document.getElementById('benefits');
const projects = document.getElementById('projects');
const remote_working = document.getElementById('remote_working');

title.innerHTML = job.title;
company.innerHTML = '<b>Company:</b> ' + job.company;
description.innerHTML = '<b>Description:</b> ' + job.description;
location_city.innerHTML = '<b>Location:</b> ' + job.location;
salary.innerHTML = '<b>Salary:</b> ' + job.salary;
job_type.innerHTML = '<b>Job Type:</b> ' + job.job_type;
skills_required.innerHTML = '<b>Skills Required:</b> ' + job.skills_required;
experience.innerHTML = '<b>Experience:</b> ' + job.experience;
team_size.innerHTML = '<b>Team Size:</b> ' + job.team_size;
benefits.innerHTML = '<b>Benefits:</b> ' + job.benefits;
projects.innerHTML = '<b>Projects:</b> ' + job.projects;
remote_working.innerHTML = '<b>Remote Working:</b> ' + job.remote_working;


const applyButton = document.getElementById('apply');
applyButton.addEventListener('click', function (event) {
    event.preventDefault();
    location.replace('/apply');
});
