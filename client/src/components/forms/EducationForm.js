import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { addEducation, editEducation } from '../../actions/profile';
import { connect } from 'react-redux';

const EducationForm = ({
	addEducation,
	editEducation,
	education,
	setEducation,
}) => {
	const btnRef = useRef(null);
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldOfStudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { school, degree, fieldOfStudy, from, to, current, description } =
		formData;

	useEffect(() => {
		setFormData({
			school: education?.school || '',
			degree: education?.degree || '',
			fieldOfStudy: education?.fieldOfStudy || '',
			from: education?.from || '',
			to: education?.to || '',
			current: education?.current || false,
			description: education?.description || '',
		});
	}, [education]);

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleOnSubmit = e => {
		e.preventDefault();
		console.log(formData);
		if (education) {
			editEducation(formData, education._id);
		} else {
			addEducation(formData);
		}
		btnRef.current?.click();
		setFormData({
			school: '',
			degree: '',
			fieldOfStudy: '',
			from: '',
			to: '',
			current: false,
			description: '',
		});
		setEducation(null);
	};

	return (
		<form onSubmit={handleOnSubmit} className='form'>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='School'
					name='school'
					onChange={handleOnChange}
					id='floatingInput'
					value={school}
					required
				/>
				<label htmlFor='floatingInput'>School</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Degree'
					name='degree'
					onChange={handleOnChange}
					id='floatingInput'
					value={degree}
					required
				/>
				<label htmlFor='floatingInput'>Degree</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control form-control-lg'
					placeholder='Field Of Study'
					name='fieldOfStudy'
					onChange={handleOnChange}
					id='floatingInput'
					value={fieldOfStudy}
				/>
				<label htmlFor='floatingInput'>Field Of Study</label>
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
					Current
				</p>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='date'
					className='form-control form-control-lg'
					placeholder='To'
					name='to'
					min={from}
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
				data-bs-target='#educationForm'
			></button>
		</form>
	);
};

EducationForm.propTypes = {
	addEducation: PropTypes.func.isRequired,
	editEducation: PropTypes.func.isRequired,
};

export default connect(null, { editEducation, addEducation })(EducationForm);
