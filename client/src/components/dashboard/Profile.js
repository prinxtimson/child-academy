import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Moment from 'react-moment';

const Profile = ({
	profile: { profile, loading },
	match: { params },
	auth: { user },
	getProfileById,
}) => {
	useEffect(() => {
		getProfileById(params.id);
	}, [getProfileById, params]);
	return (
		<Fragment>
			<Navbar />
			{!profile || loading ? (
				<Spinner />
			) : (
				<div className='container-fluid p-4'>
					<section className='d-flex py-4 align-items-center'>
						<div className='col-4'>
							<img
								src={profile.user.avatar}
								alt={profile.user.name}
								className='rounded mx-auto d-block'
							/>
						</div>
						<div className='col-8'>
							<div className='row'>
								<div className='col-8'>
									<h2>
										<strong>{profile.user.name}</strong>
									</h2>
									<p>{profile.location && <span>{profile.location}</span>}</p>
									<div className='py-1 d-flex'>
										{profile.socialMedia?.twitter && (
											<a
												href={profile.socialMedia.twitter}
												target='_blank'
												rel='noopener noreferrer'
												className='m-2'
											>
												<i className='fab fa-twitter fa-2x' />
											</a>
										)}
										{profile.socialMedia?.facebook && (
											<a
												href={profile.socialMedia.facebook}
												target='_blank'
												className='m-2'
												rel='noopener noreferrer'
											>
												<i className='fab fa-facebook fa-2x' />
											</a>
										)}
										{profile.socialMedia?.linkedin && (
											<a
												href={profile.socialMedia.linkedin}
												target='_blank'
												rel='noopener noreferrer'
												className='m-2'
											>
												<i className='fab fa-linkedin fa-2x' />
											</a>
										)}
										{profile.socialMedia?.instagram && (
											<a
												href={profile.socialMedia.instagram}
												target='_blank'
												rel='noopener noreferrer'
												className='m-2'
											>
												<i className='fab fa-instagram fa-2x' />
											</a>
										)}
										{profile.socialMedia?.youtube && (
											<a
												href={profile.socialMedia.youtube}
												target='_blank'
												className='m-2'
												rel='noopener noreferrer'
											>
												<i className='fab fa-youtube fa-2x' />
											</a>
										)}
									</div>
								</div>
								{profile.user._id !== user._id && (
									<div className='col-4'>
										<button
											className='btn btn-info'
											data-bs-toggle='modal'
											data-bs-target='#bookTutorModal'
										>
											Book Tutor
										</button>
									</div>
								)}
							</div>
						</div>
					</section>
					<section className='container'>
						<div className='row'>
							<div className='col-md-4'>
								<div className='card shadow mb-5 bg-body rounded'>
									<div className='card-header'>
										<strong>Subjects</strong>
									</div>
									<div className='card-body'>
										{profile.subjects.map((subject, index) => (
											<span key={index} className='badge bg-light text-dark'>
												{subject}
											</span>
										))}
									</div>
								</div>
								<div className='card shadow mb-5 bg-body rounded'>
									<div className='card-header'>
										<strong>Levels</strong>
									</div>
									<div className='card-body'>
										{profile.levels?.map((level, index) => (
											<span key={index} className='badge bg-light text-dark'>
												{level}
											</span>
										))}
									</div>
								</div>
								<div className='card shadow mb-5 bg-body rounded'>
									<div className='card-header'>
										<strong>Skills</strong>
									</div>
									<div className='card-body'>
										<ul>
											{profile.skills.map((skill, index) => (
												<li key={index} className='text-primary p-1'>
													<i className='fas fa-check'></i> {skill}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className='col-md-8'>
								<div className='card shadow mb-5 bg-body rounded'>
									<div className='card-header'>
										<strong>Bio</strong>
									</div>
									<div className='card-body'>
										<h6>{profile.bio}</h6>
									</div>
								</div>
								<div className='card shadow mb-5 bg-body rounded'>
									<div className='card-header'>
										<strong>Education</strong>
									</div>
									<div className='card-body'>
										{profile.education.map(item => (
											<div className='shadow-none p-3 mb-5 bg-light rounded'>
												<div>
													<h5>
														<strong>{item.school}</strong>
													</h5>
													<h6>
														<span>{item.degree}</span> -{' '}
														<span>{item.fieldOfStudy}</span>
													</h6>
												</div>
												<p>
													<Moment format='ll'>{item.from}</Moment> -{' '}
													{item.to === null ? (
														'Present'
													) : (
														<Moment format='ll'>{item.to}</Moment>
													)}
												</p>
												<p>{item.description}</p>
											</div>
										))}
									</div>
								</div>
								<div className='card shadow mb-5 bg-body rounded'>
									<div className='card-header'>
										<strong>Experience</strong>
									</div>
									<div className='card-body'>
										{profile.experience.map(item => (
											<div className='shadow-none p-3 mb-5 bg-light rounded'>
												<div>
													<h5>
														<strong>{item.title}</strong>
													</h5>
													<h6>{item.company}</h6>
												</div>

												<p>
													<Moment format='ll'>{item.from}</Moment> -{' '}
													{item.to === null ? (
														'Present'
													) : (
														<Moment format='ll'>{item.to}</Moment>
													)}
												</p>
												<p>{item.location}</p>
												<p>{item.description}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
