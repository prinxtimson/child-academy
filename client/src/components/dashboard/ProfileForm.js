import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EducationForm from '../forms/EducationForm';
import ExperienceForm from '../forms/ExperienceForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import UploadAvatar from '../forms/UploadAvatar';
import Education from './Education';
import Experience from './Experience';
import { updateProfile, delAccount } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileForm = ({
	profile: { loading, profile },
	user,
	updateProfile,
	delAccount,
}) => {
	const [formData, setFormData] = useState({
		firstname: profile.firstname || '',
		lastname: profile.lastname || '',
		subjects: profile.subjects?.toString() || '',
		levels: profile.levels?.toString() || '',
		bio: profile.bio || '',
		phone: profile.phone || '',
		gender: profile.gender || '',
		twitter: profile.socialMedia?.twitter || '',
		facebook: profile.socialMedia?.facebook || '',
		linkedin: profile.socialMedia?.linkedin || '',
	});
	const [currentExperience, setCurrentExperience] = useState(null);
	const [currentEducation, setCurrentEducation] = useState(null);

	const {
		firstname,
		lastname,
		phone,
		gender,
		subjects,
		levels,
		bio,
		twitter,
		facebook,
		linkedin,
	} = formData;

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleOnSubmit = e => {
		e.preventDefault();
		updateProfile(formData);
	};

	useEffect(() => {
		const experienceModal = document.getElementById('experienceForm');
		experienceModal.addEventListener('hide.bs.modal', function (event) {
			// do something...experienceForm
			setCurrentExperience({});
		});

		const educationModal = document.getElementById('educationForm');
		educationModal.addEventListener('hide.bs.modal', function (event) {
			setCurrentEducation({});
		});
	}, []);

	return (
		<div>
			<div className='row'>
				<div className={profile.isTutor ? 'col-md-4' : 'col-md-6'}>
					<div className='card my-3'>
						<div className='card-header'>General Information</div>
						<div className='card-body'>
							<form onSubmit={handleOnSubmit} className='form'>
								<div className='form-floating mb-3'>
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
								<div className='form-floating mb-3'>
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
								<div className='form-floating mb-3'>
									<select
										name='gender'
										onChange={handleOnChange}
										id='floatingInput'
										value={gender}
										className='form-select form-select-lg'
										aria-label='.form-select-lg example'
									>
										<option value=''>Select Gender</option>
										<option value='female'>Female</option>
										<option value='male'>Male</option>
									</select>
									<label htmlFor='floatingInput'>Gender</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Phone number'
										name='phone'
										onChange={handleOnChange}
										id='floatingInput'
										value={phone}
									/>
									<label htmlFor='floatingInput'>Phone number</label>
								</div>
								<div className='form-floating mb-3'>
									<textarea
										className='form-control'
										placeholder='Bio'
										name='bio'
										onChange={handleOnChange}
										id='floatingInput'
										value={bio}
										style={{ height: 100 }}
									></textarea>
									<label htmlFor='floatingInput'>Bio</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Subjects'
										name='subjects'
										onChange={handleOnChange}
										id='floatingInput'
										value={subjects}
										list='subjectList'
										required
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
										Enter each subjects seperated by "," e.g Maths, English ...
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
									<label htmlFor='floatingInput'>Levels *</label>
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
										Enter each levels seperated by "," e.g Year 1, Year 2 ...
									</div>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='LinkedIn'
										name='linkedin'
										onChange={handleOnChange}
										id='floatingInput'
										value={linkedin}
									/>
									<label htmlFor='floatingInput'>LinkedIn</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Twitter'
										name='twitter'
										onChange={handleOnChange}
										id='floatingInput'
										value={twitter}
									/>
									<label htmlFor='floatingInput'>Twitter</label>
								</div>
								<div className='form-floating mb-3'>
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
								<div className='d-grid gap-2 col-12 mx-auto'>
									<button className='btn btn-primary btn-lg' type='submit'>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className={`col-md-4 ${!profile.isTutor && 'd-none'}`}>
					<div className='card my-3'>
						<div className='card-header d-flex justify-content-between align-items-center'>
							Experience{' '}
							<span>
								<button
									type='button'
									className='btn btn-light'
									data-bs-toggle='modal'
									data-bs-target='#experienceForm'
								>
									Add
								</button>
							</span>
						</div>
						<div className='card-body'>
							{profile.experience.map(item => (
								<Experience
									key={item._id}
									experience={item}
									setExperience={setCurrentExperience}
								/>
							))}
							<div
								className='modal fade'
								id='experienceForm'
								tabIndex='-1'
								aria-labelledby='experienceForm'
								aria-hidden='true'
							>
								<div className='modal-dialog'>
									<div className='modal-content p-4'>
										<ExperienceForm
											experience={currentExperience}
											setExperience={setCurrentExperience}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card my-3'>
						<div className='card-header d-flex justify-content-between align-items-center'>
							Education{' '}
							<span>
								<button
									type='button'
									className='btn btn-light'
									data-bs-toggle='modal'
									data-bs-target='#educationForm'
								>
									Add
								</button>
							</span>
						</div>
						<div className='card-body'>
							{profile.education.map(item => (
								<Education
									key={item._id}
									edu={item}
									setEducation={setCurrentEducation}
								/>
							))}
							<div
								className='modal fade'
								id='educationForm'
								tabIndex='-1'
								aria-labelledby='educationForm'
								aria-hidden='true'
							>
								<div className='modal-dialog'>
									<div className='modal-content p-4'>
										<EducationForm
											education={currentEducation}
											setEducation={setCurrentEducation}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={profile.isTutor ? 'col-md-4' : 'col-md-6'}>
					<div className='card my-3'>
						<div className='card-header'>Upload Photo</div>
						<div className='card-body'>
							<UploadAvatar user={user} />
						</div>
					</div>
					<div className='card my-3'>
						<div className='card-header'>Change Password</div>
						<div className='card-body'>
							<ChangePasswordForm />
						</div>
					</div>
				</div>
			</div>
			<div className='d-grid gap-2 col-12 mb-5 mx-auto'>
				<button
					className='btn btn-danger btn-lg'
					onClick={delAccount}
					type='button'
				>
					Delete Account
				</button>
			</div>
		</div>
	);
};

ProfileForm.propTypes = {
	profile: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	updateProfile: PropTypes.func.isRequired,
	delAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	user: state.auth.user,
});

const mapDispatchToProps = { updateProfile, delAccount };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
