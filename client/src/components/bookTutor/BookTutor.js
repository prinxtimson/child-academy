import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookLesson } from '../../actions/lesson';
import Alert from '../Alert';

const BookTutor = ({ profile, bookLesson }) => {
	const [day, setDay] = useState();
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState({
		introduction: '',
		email: '',
		phone: '',
		subject: '',
		level: '',
		studentName: '',
		date: '',
		time: '',
		tutor: '',
	});

	const {
		introduction,
		email,
		phone,
		subject,
		level,
		date,
		time,
		studentName,
	} = formData;

	useEffect(() => {
		const d = new Date(date).getUTCDay();
		setDay(d);
	}, [date]);

	useEffect(() => {
		const bookTutorModal = document.getElementById('bookTutorModal');
		bookTutorModal.addEventListener('hide.bs.modal', function (event) {
			setIsSuccess(false);
		});
	}, []);

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleTimeClick = t => setFormData({ ...formData, time: t });

	const handleOnSubmit = e => {
		e.preventDefault();
		formData.tutor = profile?.user._id;
		bookLesson(formData, onSuccessful);
	};

	const onSuccessful = () => {
		setFormData({
			introduction: '',
			email: '',
			phone: '',
			subject: '',
			level: '',
			studentName: '',
			date: '',
			time: '',
		});
		setIsSuccess(true);
	};

	return (
		<Fragment>
			<Alert />
			<div className='row'>
				<div className='col-md-4'>
					<div className='card shadow mb-5 bg-body rounded'>
						<div className='card-body'>
							<img
								src={profile?.user.avatar}
								alt={profile?.user.name}
								className='rounded mx-auto d-block'
								style={{ maxWidth: '100%' }}
							/>
							<h4 className='py-2 text-center'>
								<strong>{profile?.user.name}</strong>
							</h4>
						</div>
					</div>
				</div>
				<div className='col-md-8'>
					<div className='shadow mb-5 bg-body rounded p-4'>
						{isSuccess ? (
							<Fragment>
								<div className='d-flex justify-content-center'>
									<i
										className='fas fa-check-circle text-success mx-auto'
										style={{ fontSize: 50 }}
									></i>
								</div>
								<h2 className='text-center'>
									<strong>Lesson Request Successful</strong>
								</h2>

								<h4 className='text-center'>
									Your Lesson request had been received by
									<strong>{profile?.user.name}</strong>, You will received
									notifications once <strong>{profile?.user.name}</strong>{' '}
									accept your request!
								</h4>
							</Fragment>
						) : (
							<>
								<h2>
									<strong>Schedule</strong>
								</h2>
								<form onSubmit={handleOnSubmit} className='from'>
									<div className='mb-3'>
										<label htmlFor='subjectInput'>Subject</label>
										<select
											name='subject'
											onChange={handleOnChange}
											id='subjectInput'
											value={subject}
											className='form-select form-select-lg'
											aria-label='.form-select-lg example'
										>
											<option value=''>Select Subject</option>
											<option value='Maths'>Maths</option>
											<option value='English'>English</option>
											<option value='Science'>Science</option>
											<option value='ICT'>ICT</option>
										</select>
									</div>
									<div className='mb-3'>
										<label htmlFor='levelInput'>Level</label>
										<select
											name='level'
											onChange={handleOnChange}
											id='levelInput'
											value={level}
											className='form-select form-select-lg'
											aria-label='.form-select-lg example'
										>
											<option value=''>Select Level</option>
											<option value='Year 1'>Year 1</option>
											<option value='Year 2'>Year 2</option>
											<option value='Year 3'>Year 3</option>
											<option value='Year 4'>Year 4</option>
											<option value='Year 5'>Year 5</option>
											<option value='Year 6'>Year 6</option>
										</select>
									</div>
									<div className='mb-3'>
										<label htmlFor='introductionInput'>
											{`Introduce yourself to ${profile?.firstname} `}{' '}
											<span className='lead'>Optional</span>
										</label>
										<textarea
											className='form-control'
											placeholder={`Introduce yourself to ${profile?.firstname} `}
											name='introduction'
											onChange={handleOnChange}
											id='introductionInput'
											value={introduction}
											rows='3'
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='studentNameInput'>
											Who is this lesson for?
										</label>
										<input
											className='form-control'
											placeholder='Student first name'
											name='studentName'
											type='text'
											onChange={handleOnChange}
											id='studentNameInput'
											value={studentName}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='studentNameInput'>
											Propose lesson date
										</label>
										<input
											className='form-control'
											placeholder='Propose lesson date'
											name='date'
											onChange={handleOnChange}
											id='studentNameInput'
											type='date'
											value={date}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='studentNameInput'>Choose lesson time</label>
										{/* Check for the day of the week and return time option */}
										{day === 0 || day === 6 ? (
											<div className='d-flex gap-3 mx-2'>
												<div className=''>
													<button
														className={`btn  ${
															time === '10:00am'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('10:00am')}
														type='button'
													>
														10:00am
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '11:00am'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('11:00am')}
														type='button'
													>
														11:00am
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '12:00pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('12:00pm')}
														type='button'
													>
														12:00pm
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '01:00pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('01:00pm')}
														type='button'
													>
														01:00pm
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '02:00pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('02:00pm')}
														type='button'
													>
														02:00pm
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '03:00pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('03:00pm')}
														type='button'
													>
														03:00pm
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '04:00pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('04:00pm')}
														type='button'
													>
														04:00pm
													</button>
												</div>
											</div>
										) : (
											<div className='d-flex gap-3 mx-2'>
												<div className=''>
													<button
														className={`btn  ${
															time === '3:30pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('3:30pm')}
														type='button'
													>
														3:30pm
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '4:30pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('4:30pm')}
														type='button'
													>
														4:30pm
													</button>
												</div>
												<div className=''>
													<button
														className={`btn  ${
															time === '5:30pm'
																? 'btn-primary'
																: 'btn-outline-secondary'
														}`}
														onClick={() => handleTimeClick('5:30pm')}
														type='button'
													>
														5:30pm
													</button>
												</div>
											</div>
										)}
									</div>
									<div className='mb-3'>
										<h5>Contact information</h5>
										<p>
											This information will never appear on the website and will
											only be given to the tutors you select.
										</p>
										<div className='row'>
											<div className='col-6'>
												<label htmlFor='emailInput'>Email</label>
												<input
													className='form-control'
													placeholder='Your email'
													name='email'
													onChange={handleOnChange}
													id='emailInput'
													type='text'
													value={email}
												/>
											</div>
											<div className='col-6'>
												<label htmlFor='phoneNumberInput'>Phone number</label>
												<input
													className='form-control'
													placeholder='Your phone number'
													name='phone'
													onChange={handleOnChange}
													id='phoneNumberInput'
													type='text'
													value={phone}
												/>
											</div>
										</div>
									</div>
									<div className='d-grid gap-2 col-12 mx-auto'>
										<button className='btn btn-primary btn-lg' type='submit'>
											Book Lesson
										</button>
									</div>
								</form>
							</>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

BookTutor.propTypes = {
	bookLesson: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile.profile,
});

const mapDispatchToProps = { bookLesson };

export default connect(mapStateToProps, mapDispatchToProps)(BookTutor);
