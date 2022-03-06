import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { addExperience, editExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const ExperienceForm = ({
	addExperience,
	editExperience,
	experience,
	setExperience,
}) => {
	const btnRef = useRef(null);
	const [formData, setFormData] = useState({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	useEffect(() => {
		setFormData({
			title: experience?.title || '',
			company: experience?.company || '',
			location: experience?.location || '',
			from: experience?.from || '',
			to: experience?.to || '',
			current: experience?.current || false,
			description: experience?.description || '',
		});
	}, [experience]);

	const { title, company, location, from, to, current, description } = formData;

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleOnSubmit = e => {
		e.preventDefault();
		if (experience) {
			editExperience(formData, experience._id);
		} else {
			addExperience(formData);
		}
		btnRef.current?.click();
		setFormData({
			title: '',
			company: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
		});
		setExperience(null);
	};

	return (
		<form onSubmit={handleOnSubmit} className='form'>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Job Title'
					name='title'
					onChange={handleOnChange}
					id='floatingInput'
					value={title}
					required
				/>
				<label htmlFor='floatingInput'>Job Title</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Company'
					name='company'
					onChange={handleOnChange}
					id='floatingInput'
					value={company}
					required
				/>
				<label htmlFor='floatingInput'>Company</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Location'
					name='location'
					onChange={handleOnChange}
					id='floatingInput'
					value={location}
				/>
				<label htmlFor='floatingInput'>Location</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='date'
					className='form-control form-control-lg'
					placeholder='From'
					name='from'
					onChange={handleOnChange}
					id='floatingInput'
					value={from}
				/>
				<label htmlFor='floatingInput'>From</label>
			</div>
			<div className='form-group mb-3'>
				<p>
					<input
						type='checkbox'
						name='current'
						id='current'
						checked={current}
						onChange={() => setFormData({ ...formData, current: !current })}
					/>{' '}
					Current Job
				</p>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='date'
					className='form-control form-control-lg'
					placeholder='To'
					name='to'
					min={from}
					disabled={current}
					onChange={handleOnChange}
					id='floatingInput'
					value={to}
				/>
				<label htmlFor='floatingInput'>To</label>
			</div>
			<div className='mb-3'>
				<textarea
					className='form-control'
					placeholder='Description'
					name='description'
					onChange={handleOnChange}
					id='floatingInput'
					value={description}
					rows={2}
				></textarea>
			</div>
			<div className='d-grid gap-2 col-12 mx-auto'>
				<button className='btn btn-primary btn-lg' type='submit'>
					Submit
				</button>
			</div>
			<button
				type='button'
				ref={btnRef}
				className='d-none'
				data-bs-toggle='modal'
				data-bs-target='#experienceForm'
			></button>
		</form>
	);
};

ExperienceForm.propTypes = {
	addExperience: PropTypes.func.isRequired,
	editExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience, editExperience })(ExperienceForm);
