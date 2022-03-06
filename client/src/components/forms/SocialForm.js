import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {} from '../../../actions/profile';
import { connect } from 'react-redux';

const SocialForm = ({}) => {
	const [formData, setFormData] = useState({
		twitter: '',
		facebook: '',
		instagram: '',
		youtube: '',
		linkedin: '',
	});

	const { twitter, facebook, instagram, youtube, linkedin } = formData;

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleOnSubmit = () => {};

	return (
		<form onSubmit={handleOnSubmit} className='form'>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='LinkedIn'
					name='linkedin'
					onChange={handleOnChange}
					id='floatingInput'
					value={linkedin}
					required
				/>
				<label htmlFor='floatingInput'>LinkedIn</label>
			</div>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Twitter'
					name='twitter'
					onChange={handleOnChange}
					id='floatingInput'
					value={twitter}
					required
				/>
				<label htmlFor='floatingInput'>Twitter</label>
			</div>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Facebook'
					name='facebook'
					onChange={handleOnChange}
					id='floatingInput'
					value={facebook}
				/>
				<label htmlFor='floatingInput'>Facebook</label>
			</div>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Instagram'
					name='instagram'
					onChange={handleOnChange}
					id='floatingInput'
					value={instagram}
				/>
				<label htmlFor='floatingInput'>Instagram</label>
			</div>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='YouTube'
					name='youtube'
					onChange={handleOnChange}
					id='floatingInput'
					value={youtube}
				/>
				<label htmlFor='floatingInput'>YouTube</label>
			</div>
		</form>
	);
};

SocialForm.propTypes = {};

const mapDispatchToProps = {};

export default connect()(SocialForm);
