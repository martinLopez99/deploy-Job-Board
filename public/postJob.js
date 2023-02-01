function modifyFormData(formData) {

    const max = formData.get('max_salary_input');   // String
    const min = formData.get('min_salary_input');   // String
    let salary = '';

    // add a new key-value pair
    salary = '$' + min + ' - ' + '$' + max + ' per year';
    formData.append("salary", salary);

    // delete a key-value pair
    formData.delete("min_salary_input");
    formData.delete("max_salary_input");

    // modify an existing key-value pair
    const team_data = formData.get('team_size');
    if (!team_data == '') {
        formData.set("team_size", team_data + ' people');
    }

    // set default values for keys which have not been filled in.
    for (let [key, value] of formData) {
        if (value == '') {
            value = "Not set, please contact the company for details.";
            formData.set(key, value);
        }
    }

    return formData;
}


const postButton = document.getElementById('postButton');
postButton.addEventListener('click', function (event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const max = Number(formData.get('max_salary_input'));
    const min = Number(formData.get('min_salary_input'));

    // Validation of inputs 
    const min_range = 60000;
    const max_range = 350000;
    let filled = true;

    function validateInputs(min_range, max_range, min, max) {
        return (min < max) && validateRange(min_range, max_range, min, max);
    }

    function validateRange(min_range, max_range, min, max) {
        return (min >= min_range && max <= max_range);
    }

    if (!validateInputs(min_range, max_range, min, max)) {
        alert('Wrong Salary input or incorrect format');
    }

    const inputs_required = ['title', 'company', 'description', 'location', 'min_salary_input', 'max_salary_input'
        , 'skills_required', 'experience'];

    // check if all required inputs are filled
    if (!inputs_required.every(input => formData.get(input) !== '')) {
        alert('Error there are inputs not filled or are incorrects');
        filled = false;
    }
    // End of Validation 

    // if all inputs are valid and filled
    if (filled && validateInputs(min_range, max_range, min, max)) {
        //modify form data
        const data = modifyFormData(formData);
        const body = {};

        //convert formdata to json
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }

        // post the data to the server
        fetch('./Jobs.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("New Job posted!");
                location.replace('/')
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});



