import React from 'react';
import PropTypes from 'prop-types';

const AboutYouForm = ({
	formData,
	handleOnChange,
	nextStep,
	handleDayClick,
	handleCheckClick,
}) => {
	const {
		bio,
		subjects,
		levels,
		isAdult,
		speakEnglish,
		ukResident,
		daysAvailable,
	} = formData;

	const handleOnSubmit = e => {
		e.preventDefault();
		nextStep();
	};

	return (
		<div className='my-5 mx-auto' style={{ maxWidth: '540px' }}>
			<h2 className='text-primary text-center'>About You</h2>
			<p className='mb-3 text-center'>We'd love to know you better!</p>
			<form onSubmit={handleOnSubmit} className='form'>
				<div className='form-floating mb-3'>
					<textarea
						className='form-control'
						placeholder='Please enter your bio'
						name='bio'
						onChange={handleOnChange}
						id='floatingInput'
						value={bio}
						style={{ height: 100 }}
						required
					/>
					<label htmlFor='floatingInput'>Bio *</label>
				</div>
				<div className='form-floating mb-3'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='Subject'
						name='subjects'
						onChange={handleOnChange}
						id='floatingInput'
						value={subjects}
						required
						list='subjectList'
					/>
					<label htmlFor='floatingInput'>Subjects *</label>
					<datalist id='subjectList'>
						<option value='All Subjects' />
						<option value='Maths' />
						<option value='English' />
						<option value='Science' />
						<option value='ICT' />
					</datalist>
					<div className='form-text'>
						Enter each subjects you teach seperated by "," e.g Maths, English
						...
					</div>
				</div>
				<div className='form-floating mb-3'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='Level'
						name='levels'
						onChange={handleOnChange}
						id='floatingInput'
						value={levels}
						list='levelList'
						required
					/>
					<label htmlFor='floatingInput'>Level</label>
					<datalist id='levelList'>
						<option value='All levels' />
						<option value='Year 1' />
						<option value='Year 2' />
						<option value='Year 3' />
						<option value='Year 4' />
						<option value='Year 5' />
						<option value='Year 6' />
					</datalist>
					<div className='form-text'>
						Enter each levels you teach seperated by "," e.g Year 1, Year 2 ...
					</div>
				</div>
				<div className='mt-4'>
					<div className='form-check'>
						<input
							className='form-check-input'
							type='checkbox'
							id='flexCheckDefault'
							name='isAdult'
							checked={isAdult}
							onChange={handleCheckClick}
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							I am over 18 years old
						</label>
					</div>
					<div className='form-check'>
						<input
							className='form-check-input'
							type='checkbox'
							id='flexCheckDefault'
							name='speakEnglish'
							checked={speakEnglish}
							onChange={handleCheckClick}
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							I can speak, read and write fluently in English
						</label>
					</div>
					<div className='form-check'>
						<input
							className='form-check-input'
							type='checkbox'
							value=''
							id='flexCheckDefault'
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							I agree that ChildAcademy can store my details for volunteering
						</label>
					</div>
					<div className='form-check'>
						<input
							className='form-check-input'
							type='checkbox'
							value=''
							id='flexCheckDefault'
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							I would like to receive the latest news from ChildAcademy
						</label>
					</div>
					<div className='form-check'>
						<input
							className='form-check-input'
							type='checkbox'
							id='flexCheckDefault'
							name='ukResident'
							checked={ukResident}
							onChange={handleCheckClick}
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							I confirm that I am living in the UK
						</label>
					</div>
				</div>
				<div className='mt-4'>
					<h5>
						<strong>Availability</strong>
					</h5>
					<p>
						We would love to know when you will be available to help our
						children learn. Do not worry if you change your schedule in future,
						we are here to accommodate your changes.
					</p>
					<h6 className='lead'>Options</h6>
					<p>Weekdays (3.30pm - 6.30pm)</p>
					<p>Weekends (10am - 5pm)</p>
					<div>
						<div className='d-flex align-items-center my-4'>
							<div className=''>Weekdays</div>
							<div className='d-flex gap-3 mx-2'>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Mon')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Mon')}
										type='button'
									>
										Mon
									</button>
								</div>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Tues')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Tues')}
										type='button'
									>
										Tues
									</button>
								</div>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Wed')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Wed')}
										type='button'
									>
										Wed
									</button>
								</div>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Thurs')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Thurs')}
										type='button'
									>
										Thurs
									</button>
								</div>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Fri')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Fri')}
										type='button'
									>
										Fri
									</button>
								</div>
							</div>
						</div>
						<div className='d-flex align-items-center mb-4'>
							<div>Weekends</div>
							<div className='d-flex gap-3 mx-2'>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Sat')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Sat')}
										type='button'
									>
										Sat
									</button>
								</div>
								<div className=''>
									<button
										className={`btn ${
											daysAvailable.find(item => item === 'Sun')
												? 'btn-primary'
												: 'btn-outline-secondary'
										}`}
										onClick={() => handleDayClick('Sun')}
										type='button'
									>
										Sun
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='d-grid gap-2 col-6'>
					<button className='btn btn-primary' type='submit'>
						Continue
					</button>
				</div>
			</form>
		</div>
	);
};

AboutYouForm.propTypes = {
	formData: PropTypes.object.isRequired,
	handleOnChange: PropTypes.func.isRequired,
};

export default AboutYouForm;
