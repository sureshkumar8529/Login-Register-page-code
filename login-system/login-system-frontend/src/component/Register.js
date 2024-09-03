import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const jobTitles = [
    'CEO',
    'CFO',
    'COO',
    'CTO',
    'CIO',
    'VICE_PRESIDENT',
    'SENIOR_MANAGER',
    'MANAGER',
    'TEAM_LEAD',
    'SOFTWARE_ENGINEER',
    'JUNIOR_ENGINEER',
    'INTERN'
];

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    // const [IsPopupOpen, setIsPopupOpen] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();

        let errorsObj = {};

        if (!firstname.trim()) {
            errorsObj.firstname = 'Please enter your first name.';
        }

        if (!lastname.trim()) {
            errorsObj.lastname = 'Please enter your last name.';
        }


        if (!username.trim()) {
            errorsObj.username = 'Please enter your username.';
        } else if (!username.includes('@gmail.com') && !username.includes('yahoo.com')) {
            errorsObj.username = 'Username must contain @gmail.com or yahoo.com';
        } else if (username.length < 14) {
            errorsObj.username = 'Username must be at least 5 letters long before  @gmail.com.';
        }

        if (!jobTitle.trim()) {
            errorsObj.jobTitle = 'Please select a job title.';
        }

        if (!mobile.trim()) {
            errorsObj.mobile = 'Please enter your mobile number.';
        }

        if (!location.trim()) {
            errorsObj.location = 'Please enter your location.';
        } else if (location.length < 3) {
            errorsObj.location = 'Location must be atleast 3 characters';
        }

        if (!password.trim()) {
            errorsObj.password = 'Please enter your password.';
        }

        setErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8083/api/register', {
                firstName: firstname,
                lastName: lastname,
                username,
                titleName: jobTitle,
                mobileNumber: mobile,
                location,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage(response.data.message);
            alert("User registered successfully");
            // setIsPopupOpen(true);
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                setMessage('Error registering user: ' + JSON.stringify(error.response.data));
            } else {
                console.error('Error during request:', error.message);
                setMessage('Error registering user.');
            }
        }
    };

    return (
        <div className="main">
            <h2 className="header">Register</h2>

            <label>
                Enter Firstname <span className='star'>*</span>
            </label>
            <input
                type="text"
                placeholder="firstname"
                value={firstname} required
                onChange={(e) => setFirstname(e.target.value)}
                className="input1"
            />
            {errors.firstname && <p className="error-message">{errors.firstname}</p>}

            <label>Enter Lastname<span className='star'>*</span></label>
            <input
                type="text"
                placeholder="lastname"
                value={lastname} required
                onChange={(e) => setLastname(e.target.value)}
                className="input1"
            />
            {errors.lastname && <p className="error-message">{errors.lastname}</p>}

            <label>Enter Username<span className='star'>*</span></label>
            <input
                type="email"
                placeholder="username"
                value={username} required
                onChange={(e) => setUsername(e.target.value)}
                className="input1"
            />
            {errors.username && <p className="error-message">{errors.username}</p>}

            <label htmlFor="jobTitle">Job Title:<span className='star'>*</span></label>
            <select
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="input1"
            >
                <option value="" disabled>Select a job title</option>
                {jobTitles.map((title, index) => (
                    <option key={index} value={title}>
                        {title}
                    </option>
                ))}
            </select>
            {errors.jobTitle && <p className="error-message">{errors.jobTitle}</p>}

            <label>Mobile number<span className='star'>*</span></label>
            <input
                type="tel"
                //placeholder="Enter mobile number"
                //pattern="\d{10}"
                maxlength="10"
                minlength="10"
                pattern="\d{3}-\d{3}-\d{4}"
                placeholder="123-456-7890"
                value={mobile} required
                onChange={(e) => setMobile(e.target.value)}
                className="input1"
            />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}

            <label>Location<span className='star'>*</span></label>
            <input
                type="text"
                placeholder="Enter Current location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input1"
            />
            {errors.location && <p className="error-message">{errors.location}</p>}

            <label>Password<span className='star'>*</span></label>
            <input
                type="password"
                placeholder="Password"
                value={password} required
                onChange={(e) => setPassword(e.target.value)}
                className="input1"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}

            <button onClick={handleRegister} className="btn">Register</button>

            {message && <p className="message">{message}</p>}

            <span className="text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:text-blue-600">Login</a>
            </span>
        </div>
    );
};

export default Register;