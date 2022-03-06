import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

const ChangePasswordForm = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		password: '',
		newPassword: '',
		confirmPassword: '',
	});

	const { password, newPassword, confirmPassword } = formData;

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleOnSubmit = async e => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			await axios.put('/api/auth/change-password', formData, config);

			setAlert('Password change successful.', 'success');

			setFormData({ password: '', newPassword: '', confirmPassword: '' });
		} catch (err) {
			const { errors } = err.response.data;
			console.log(errors);

			if (errors) {
				errors.forEach(error => setAlert(error.msg, 'danger'));
			}
		}
	};

	return (
		<form onSubmit={handleOnSubmit} className='form'>
			<div className='form-floating'>
				<input
					type='password'
					className='form-control form-control-lg mb-3'
					placeholder='Old password'
					name='password'
					onChange={handleOnChange}
					id='floatingInput'
					value={password}
					required
				/>
				<label htmlFor='floatingInput'>Old password</label>
			</div>
			<div className='form-floating'>
				<input
					type='password'
					className='form-control form-control-lg mb-3'
					placeholder='New password'
					name='newPassword'
					onChange={handleOnChange}
					id='floatingInput'
					value={newPassword}
					required
				/>
				<label htmlFor='floatingInput'>New password</label>
			</div>
			<div className='form-floating'>
				<input
					type='password'
					className='form-control form-control-lg mb-3'
					placeholder='Confirm password'
					name='confirmPassword'
					onChange={handleOnChange}
					id='floatingInput'
					value={confirmPassword}
					required
				/>
				<label htmlFor='floatingInput'>Confirm password</label>
			</div>
			<div className='d-grid gap-2 col-12 mx-auto'>
				<button className='btn btn-primary btn-lg' type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
};

ChangePasswordForm.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = { setAlert };

export default connect(null, mapDispatchToProps)(ChangePasswordForm);
