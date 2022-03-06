import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	acceptLesson,
	declineLesson,
	cancelLesson,
	getLessons,
} from '../../actions/lesson';
import Moment from 'react-moment';

const MyLessons = ({
	match,
	lessons,
	auth: { user },
	history,
	acceptLesson,
	declineLesson,
	cancelLesson,
	getLessons,
}) => {
	const [currentLesson, setCurrentLesson] = useState(null);

	useEffect(() => {
		let lesson;
		// if () {

		// }
		if (match?.params.id) {
			lesson = lessons.filter(item => item._id === match?.params.id)[0];
			setCurrentLesson(lesson);
		} else {
			lessons.length > 0
				? history.push(`lessons/${lessons[0]?._id}`)
				: history.push(`lessons`);
		}
	}, [match?.params.id, lessons, history]);

	useEffect(() => {
		getLessons();
	}, [getLessons]);

	return (
		<Fragment>
			<div className='row h-100'>
				<div className='col-4 border-end py-3' style={{}}>
					{lessons.length === 0 ? (
						<div>
							<h5>No lesson request found</h5>
						</div>
					) : (
						lessons.map(item =>
							user._id === item.tutor._id ? (
								<Link
									to={`/dashboard/lessons/${item._id}`}
									className='list-group-item list-group-item-action border-0 shadow-none p-3 mb-2 bg-light rounded'
									key={item._id}
								>
									<div className='d-flex w-100 gap-2 justify-content-between'>
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
												<span
													className={`badge rounded-pill bg-${
														item.declinedAt
															? 'warning'
															: item.acceptedAt
															? 'success'
															: item.canceledAt
															? 'secondary'
															: 'primary'
													}`}
												>
													{item.declinedAt
														? 'Declined'
														: item.acceptedAt
														? 'Accepted'
														: item.canceledAt
														? 'Canceled'
														: 'Pending'}
												</span>
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
									<div className='d-flex w-100 gap-2 justify-content-between'>
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
												<span
													className={`badge rounded-pill bg-${
														item.declinedAt
															? 'warning'
															: item.acceptedAt
															? 'success'
															: item.canceledAt
															? 'secondary'
															: 'primary'
													}`}
												>
													{item.declinedAt
														? 'Declined'
														: item.acceptedAt
														? 'Accepted'
														: item.canceledAt
														? 'Canceled'
														: 'Pending'}
												</span>
											</h6>
											<small>
												<Moment fromNow>{item.updatedAt}</Moment>
											</small>
										</div>
									</div>
								</Link>
							)
						)
					)}
				</div>
				<div className='col-8'>
					{currentLesson ? (
						<>
							<div className='d-flex gap-3 w-100 py-4 justify-content-between border-bottom'>
								<div>
									<img
										src={currentLesson?.tutor?.avatar}
										alt={currentLesson?.tutor?.name}
										className='rounded-circle'
										style={{ width: 60, height: 60 }}
									/>
								</div>
								<div className='flex-grow-1'>
									<h5 className='mb-1'>{currentLesson?.tutor?.name}</h5>
									<small>Teacher</small>
								</div>
								<div>
									<h6>
										<span
											className={`badge rounded-pill bg-${
												currentLesson.declinedAt
													? 'warning'
													: currentLesson.acceptedAt
													? 'success'
													: currentLesson.canceledAt
													? 'secondary'
													: 'primary'
											}`}
										>
											{currentLesson.declinedAt
												? 'Declined'
												: currentLesson.acceptedAt
												? 'Accepted'
												: currentLesson.canceledAt
												? 'Canceled'
												: 'Pending'}
										</span>
									</h6>
									<small>
										<Moment fromNow>{currentLesson.updatedAt}</Moment>
									</small>
								</div>
							</div>
							<div>
								<div className='p-5'>
									<h4 className='text-center'>
										{!currentLesson.acceptedAt ? null : currentLesson.tutor
												?._id === user._id ? (
											<>
												You have accepted the lesson request from{' '}
												<strong>{currentLesson?.studentName}</strong> on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> Level
											</>
										) : (
											<>
												<strong>{currentLesson?.tutor?.name}</strong> had
												accepted your lesson request on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> Level
											</>
										)}
										{!currentLesson.declinedAt ? null : currentLesson.tutor
												?._id === user._id ? (
											<>
												You have declined the lesson request from{' '}
												<strong>{currentLesson?.studentName}</strong> on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> Level
											</>
										) : (
											<>
												<strong>{currentLesson?.tutor?.name}</strong> had
												declined your lesson request on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> Level
											</>
										)}
										{!currentLesson.canceledAt ? null : currentLesson.user
												?._id === user._id ? (
											<>
												You have cancel your lesson request to{' '}
												<strong>{currentLesson?.tutor?.name}</strong> on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> Level
											</>
										) : (
											<>
												<strong>{currentLesson?.studentName}</strong> had
												canceled the lesson request on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> Level
											</>
										)}
										{currentLesson.declinedAt ||
										currentLesson.acceptedAt ||
										currentLesson.canceledAt ? null : currentLesson?.tutor
												?._id === user._id ? (
											<>
												<strong>{currentLesson?.studentName}</strong> had
												requestd for a lesson class with you on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong>
											</>
										) : (
											<>
												Awaiting response from{' '}
												<strong>{currentLesson?.tutor?.name}</strong> for a
												lesson class on{' '}
												<strong>{currentLesson?.subject}</strong> for{' '}
												<strong>{currentLesson?.level}</strong> level
											</>
										)}
									</h4>
									<div className='py-3'>
										<div className='row'>
											<div className='col-6 d-flex gap-2 align-items-center'>
												<h5>Date:</h5>
												<Moment format='ll'>{currentLesson?.date}</Moment>
											</div>
											<div className='col-6 d-flex gap-2 align-items-center'>
												<h5>Time:</h5>
												<h6>{currentLesson?.time}</h6>
											</div>
										</div>
									</div>
								</div>
								{currentLesson.declinedAt ||
								currentLesson.acceptedAt ||
								currentLesson.canceledAt ? null : currentLesson?.tutor?._id ===
								  user._id ? (
									<div className='d-grid gap-2 col-6 mx-auto py-5'>
										<button
											className='btn btn-primary'
											type='button'
											onClick={() => acceptLesson(currentLesson?._id)}
										>
											Accept
										</button>
										<button
											className='btn btn-light'
											type='button'
											onClick={() => declineLesson(currentLesson?._id)}
										>
											Decline
										</button>
									</div>
								) : (
									<div className='d-grid gap-2 col-6 mx-auto py-5'>
										<button
											className='btn btn-light'
											type='button'
											onClick={() => cancelLesson(currentLesson?._id)}
										>
											Cancel
										</button>
									</div>
								)}
							</div>
						</>
					) : (
						<>
							<h4>No Lesson selected</h4>
						</>
					)}
				</div>
			</div>
		</Fragment>
	);
};

MyLessons.propTypes = {
	acceptLesson: PropTypes.func.isRequired,
	declineLesson: PropTypes.func.isRequired,
	cancelLesson: PropTypes.func.isRequired,
	getLessons: PropTypes.func.isRequired,
	lessons: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	lessons: state.lesson.lessons,
});

const mapDispatchToProps = {
	acceptLesson,
	declineLesson,
	cancelLesson,
	getLessons,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(MyLessons));
