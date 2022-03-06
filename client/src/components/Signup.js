import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { setAlert } from '../actions/alert';
import { registerUser } from '../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ setAlert, registerUser, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { firstname, lastname, email, password, confirmPassword } = formData;

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleOnSubmit = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setAlert('Password do not match', 'danger');
			return;
		}
		registerUser(formData);
	};

	// redirect if signup success
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<>
			<Navbar />
			<div className='card my-5 m-auto' style={{ maxWidth: '540px' }}>
				<div className='card-body'>
					<h1 className='card-title text-primary text-center'>Sign Up</h1>
					<p className='lead text-center'>
						<i className='fas fa-user'></i> Create Your Account
					</p>
					<form onSubmit={handleOnSubmit} className='form row g-3'>
						<div className='form-floating col-md-6'>
							<input
								type='text'
								className='form-control form-control-lg'
								placeholder='First name'
								name='firstname'
								id='floatingInput'
								value={firstname}
								onChange={handleOnChange}
								required
							/>
							<label htmlFor='floatingInput'>First name</label>
						</div>
						<div className='form-floating col-md-6'>
							<input
								type='text'
								className='form-control form-control-lg'
								placeholder='Last name'
								name='lastname'
								onChange={handleOnChange}
								id='floatingInput'
								value={lastname}
								required
							/>
							<label htmlFor='floatingInput'>Last name</label>
						</div>
						<div className='form-floating col-12'>
							<input
								type='email'
								className='form-control form-control-lg'
								value={email}
								placeholder='Email'
								id='floatingInput'
								name='email'
								onChange={handleOnChange}
								required
							/>
							<label htmlFor='floatingInput'>Email address</label>
						</div>
						<div className='form-floating col-12'>
							<input
								type='password'
								className='form-control form-control-lg'
								value={password}
								placeholder='Password'
								id='floatingInput'
								name='password'
								onChange={handleOnChange}
								required
							/>
							<label htmlFor='floatingInput'>Password</label>
						</div>
						<div className='form-floating col-12'>
							<input
								type='password'
								className='form-control form-control-lg'
								value={confirmPassword}
								placeholder='Confirm password'
								id='floatingInput'
								name='confirmPassword'
								onChange={handleOnChange}
								required
							/>
							<label htmlFor='floatingInput'>Confirm Password</label>
						</div>
						<div className='d-grid gap-2 col-12 mx-auto'>
							<button className='btn btn-primary btn-lg' type='submit'>
								Signup
							</button>
						</div>
					</form>
					<p className='my-1'>
						Already have an account? <Link to='/signin'>Sign In</Link>
					</p>
				</div>
			</div>
		</>
	);
};

Signup.propTypes = {
	setAlert: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	alert: state.alert,
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { setAlert, registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
