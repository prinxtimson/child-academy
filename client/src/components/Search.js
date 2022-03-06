import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProfiles, getProfileById } from '../actions/profile';
import { connect } from 'react-redux';
import BookTutor from './bookTutor/BookTutor';
import Navbar from './Navbar';
import Spinner from './Spinner';

const Search = ({
	match,
	getProfiles,
	profile: { profiles, profile, loading },
	user,
	getProfileById,
}) => {
	const { searchParams } = match.params;
	//const [result, setResult] = useState([]);
	const [subject, setSubject] = useState('');
	const [level, setLevel] = useState('');

	useEffect(() => {
		getProfiles();
		//setResult(profiles);

		const searchArr = searchParams.split(',');
		setSubject(searchArr[0]);
		setLevel(searchArr[1]);
	}, [getProfiles, searchParams]);

	const handleOnSearch = e => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<Navbar />
			<div className='container py-3'>
				<section className='text-light-p-5 p-5'>
					<div className='d-flex align-items-center justify-content-center'>
						<form
							onSubmit={handleOnSearch}
							className='form row p-2 container-md shadow-lg mb-5 bg-body rounded'
						>
							<div className='col-md-5'>
								<select
									placeholder='Subject'
									value={subject}
									onChange={e => setSubject(e.target.value)}
									className='form-control-plaintext p-3'
									aria-label='.form-select-lg example'
								>
									<option value='All subject'>All Subject</option>
									<option value='Maths'>Maths</option>
									<option value='English'>English</option>
									<option value='Science'>Science</option>
									<option value='ICT'>ICT</option>
								</select>
							</div>
							<div className='col-md-5'>
								<select
									placeholder='Level'
									value={level}
									onChange={e => setLevel(e.target.value)}
									className='form-control-plaintext p-3'
									aria-label='.form-select-lg example'
								>
									<option value='All level'>All Level</option>
									<option value='Year 1'>Year 1</option>
									<option value='Year 2'>Year 2</option>
									<option value='Year 3'>Year 3</option>
									<option value='Year 4'>Year 4</option>
									<option value='Year 5'>Year 5</option>
									<option value='Year 6'>Year 6</option>
								</select>
							</div>
							<div className='col-md-2 d-grid'>
								<button className='btn btn-primary btn-lg' type='submit'>
									Search
								</button>
							</div>
						</form>
					</div>
				</section>
				{loading ? (
					<Spinner />
				) : (
					profiles.length > 0 && (
						<section>
							<div className='row'>
								{profiles.map(
									item =>
										item.user.isTutor && (
											<div
												key={item.id}
												className='d-flex col-sm-12 col-md-6 my-2'
											>
												<img
													src={item.user.avatar}
													className='rounded'
													alt={item.user.name}
													width='120px'
													height='120px'
												/>
												<div className='flex-grow-1 px-2'>
													<h5 className=''>{item.user.name}</h5>
													<p className=''>{item.bio}</p>
												</div>
												{item.user._id !== user?._id && (
													<div className=''>
														<button
															className='btn btn-info'
															data-bs-toggle='modal'
															data-bs-target='#bookTutorModal'
															onClick={() => getProfileById(item.user._id)}
														>
															Book Tutor
														</button>
													</div>
												)}
											</div>
										)
								)}
							</div>
						</section>
					)
				)}
				<div
					className='modal fade'
					id='bookTutorModal'
					tabIndex='-1'
					aria-labelledby='bookTutorModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog modal-fullscreen'>
						<div className='modal-content p-4'>
							<div>
								<button
									type='button'
									className='btn btn-light'
									data-bs-toggle='modal'
									data-bs-target='#bookTutorModal'
								>
									<i className='fa fas-cancel'></i>Close
								</button>
							</div>
							<div class='modal-body'>
								<BookTutor profile={profile} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Search.propTypes = {
	match: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	user: state.auth.user,
});

const mapDispatchToProps = { getProfiles, getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
