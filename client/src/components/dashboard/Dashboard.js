import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getLessons } from '../../actions/lesson';
import Moment from 'react-moment';

const Dashboard = ({
	getCurrentProfile,
	getLessons,
	auth: { user },
	profile: { loading, profile },
	lessons,
}) => {
	const [filter, setFilter] = useState('');
	const [filterLessons, setFilterLessons] = useState([]);

	useEffect(() => {
		let newLessons;
		if (filter === 'awaiting') {
			newLessons = lessons.filter(
				item => !item.declinedAt && !item.acceptedAt && !item.canceledAt
			);
		} else if (filter === 'accepted') {
			newLessons = lessons.filter(item => item.acceptedAt);
		} else if (filter === 'declined') {
			newLessons = lessons.filter(item => item.declinedAt);
		} else if (filter === 'canceled') {
			newLessons = lessons.filter(item => item.canceledAt);
		} else {
			newLessons = lessons;
		}
		setFilterLessons(newLessons);
	}, [filter, lessons]);

	useEffect(() => {
		getCurrentProfile();
		getLessons();
	}, [getCurrentProfile, getLessons]);

	return (
		<Fragment>
			<div className='row my-4'>
				<div className='col-md-4'>
					<div className='card shadow mb-5 bg-body rounded'>
						<div className='card-body'>
							<img
								src={user.avatar}
								alt={user.name}
								className='rounded mx-auto d-block'
								style={{ maxWidth: '100%' }}
							/>
							<h4 className='py-2 text-center'>
								<strong>{user.name}</strong>
							</h4>
						</div>
					</div>
				</div>
				<div className='col-md-8'>
					<div className='card shadow mb-5 bg-body rounded'>
						<div className='card-header p-3 d-flex justify-content-between'>
							<span className='col-4 align-self-center'>
								<strong>Lessons</strong>
							</span>
							<span className='col-8'>
								<select
									className='form-select form-select-lg'
									aria-label='.form-select-lg example'
									onChange={e => setFilter(e.target.value)}
									value={filter}
								>
									<option value=''>All Awaiting/Accepted/Declined</option>
									<option value='awaiting'>Awaiting</option>
									<option value='accepted'>Accepted</option>
									<option value='declined'>Declined</option>
									<option value='canceled'>Canceled</option>
								</select>
							</span>
						</div>
						<div className='card-body'>
							<div className='list-group'>
								{filterLessons?.map(item =>
									user._id === item.tutor._id ? (
										<Link
											to={`/dashboard/lessons/${item._id}`}
											className='list-group-item list-group-item-action border-0 shadow-none p-3 mb-2 bg-light rounded'
											key={item._id}
										>
											<div className='d-flex w-100 justify-content-between'>
												<div>
													<img
														src={item.user.avatar}
														alt={item.user.name}
														className='rounded-circle'
														style={{ width: 60, height: 60 }}
													/>
												</div>
												<div className='flex-grow-1'>
													<h5 className='mb-1'>{item.studentName}</h5>
													<small>Student</small>
												</div>
												<div>
													<h6>
														{item.declinedAt ? (
															<strong>Declined</strong>
														) : item.acceptedAt ? (
															<strong>Accepted</strong>
														) : item.canceledAt ? (
															<strong>Canceled</strong>
														) : (
															<strong>Awaiting your response</strong>
														)}
													</h6>
													<small>
														<Moment fromNow>{item.updatedAt}</Moment>
													</small>
												</div>
											</div>
										</Link>
									) : (
										<Link
											to={`/dashboard/lessons/${item._id}`}
											className='list-group-item list-group-item-action border-0 shadow-none p-3 mb-2 bg-light rounded'
											key={item._id}
										>
											<div className='d-flex gap-3 w-100 justify-content-between'>
												<div>
													<img
														src={item.tutor.avatar}
														alt={item.tutor.name}
														className='rounded-circle'
														style={{ width: 60, height: 60 }}
													/>
												</div>
												<div className='flex-grow-1'>
													<h5 className='mb-1'>{item.tutor.name}</h5>
													<small>Teacher</small>
												</div>
												<div>
													<h6>
														{item.declinedAt ? (
															<strong>Declined</strong>
														) : item.acceptedAt ? (
															<strong>Accepted</strong>
														) : item.canceledAt ? (
															<strong>Canceled</strong>
														) : (
															<strong>Awaiting tutor's response</strong>
														)}
													</h6>
													<small>
														<Moment fromNow>{item.updatedAt}</Moment>
													</small>
												</div>
											</div>
										</Link>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	getLessons: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile,
	lessons: state.lesson.lessons,
});

const mapDispatchToProps = { getCurrentProfile, getLessons };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
