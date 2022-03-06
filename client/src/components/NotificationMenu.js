import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const NotificationMenu = ({ notifications }) => {
	return (
		<>
			{notifications && notifications.length === 0 ? (
				<div className='dropdown-item'>
					<h5>No notification yet</h5>
				</div>
			) : (
				notifications.map(item =>
					item.type === 'LessonRequest' ? (
						<Link
							className={`dropdown-item list-group-item list-group-item-action ${
								item.readAt ? null : null
							}`}
							aria-current='true'
							to={`/dashboard/lessons/${item.model.id}`}
							key={item._id}
						>
							<div className='d-flex w-100 justify-content-between'>
								<img
									src={item.from?.avatar}
									alt={item.from?.name}
									className='rounded-circle'
									width='50px'
									height='50px'
								/>
								<h6 className='mb-1 text-primary'>{item.from?.name}</h6>
								<small>
									<Moment fromNow>{item.createdAt}</Moment>
								</small>
							</div>
							<small>Send a lesson request for you</small>
						</Link>
					) : item.type === 'LessonRequestAccepted' ? (
						<Link
							className={`dropdown-item list-group-item list-group-item-action ${
								item.readAt ? null : null
							}`}
							aria-current='true'
							to={`/dashboard/lessons/${item.model.id}`}
							key={item._id}
						>
							<div className='d-flex w-100 justify-content-between'>
								<img
									src={item.from?.avatar}
									alt={item.from?.name}
									className='rounded-circle'
									width='50px'
									height='50px'
								/>
								<h6 className='mb-1 text-primary'>{item.from?.name}</h6>
								<small>
									<Moment fromNow>{item.createdAt}</Moment>
								</small>
							</div>
							<small>Accepted your lesson request</small>
						</Link>
					) : item.type === 'LessonRequestDeclined' ? (
						<Link
							className={`dropdown-item list-group-item list-group-item-action ${
								item.readAt ? null : null
							}`}
							aria-current='true'
							to={`/dashboard/lessons/${item.model.id}`}
							key={item._id}
						>
							<div className='d-flex w-100 justify-content-between'>
								<img
									src={item.from?.avatar}
									alt={item.from?.name}
									className='rounded-circle'
									width='50px'
									height='50px'
								/>
								<h6 className='mb-1 text-primary'>{item.from?.name}</h6>
								<small>
									<Moment fromNow>{item.createdAt}</Moment>
								</small>
							</div>
							<small>Declined your lesson request</small>
						</Link>
					) : item.type === 'LessonRequestCancel' ? (
						<Link
							className={`dropdown-item list-group-item list-group-item-action ${
								item.readAt ? null : null
							}`}
							aria-current='true'
							to={`/dashboard/lessons/${item.model.id}`}
							key={item._id}
						>
							<div className='d-flex w-100 justify-content-between'>
								<img
									src={item.from?.avatar}
									alt={item.from?.name}
									className='rounded-circle'
									width='50px'
									height='50px'
								/>
								<h6 className='mb-1 text-primary'>{item.from?.name}</h6>
								<small>
									<Moment fromNow>{item.createdAt}</Moment>
								</small>
							</div>
							<small>Canceled the lesson request</small>
						</Link>
					) : (
						<Link
							className={`dropdown-item list-group-item list-group-item-action ${
								item.readAt ? null : null
							}`}
							aria-current='true'
							to={`/dashboard/lessons/${item.model.id}`}
							key={item._id}
						>
							<div className='d-flex w-100 justify-content-between'>
								<img
									src={item.from?.avatar}
									alt={item.from?.name}
									className='rounded-circle'
									width='50px'
									height='50px'
								/>
								<h6 className='mb-1 text-primary'>{item.from?.name}</h6>
								<small>
									<Moment fromNow>{item.createdAt}</Moment>
								</small>
							</div>
							<small>Change lesson date</small>
						</Link>
					)
				)
			)}
		</>
	);
};

NotificationMenu.propTypes = {
	notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	notifications: state.notification.notifications,
});

export default connect(mapStateToProps)(NotificationMenu);
