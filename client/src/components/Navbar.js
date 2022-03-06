import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { readNotification } from '../actions/notification';
import PropTypes from 'prop-types';
import NotificationMenu from './NotificationMenu';

const Navbar = ({
	auth: { isAuthenticated, loading, user },
	logoutUser,
	readNotification,
	notifications,
}) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const result = notifications.filter(item => !item.readAt).length;
		setCount(result);
	}, [notifications]);

	const authLinks = (
		<ul className='navbar-nav ms-auto'>
			{!user?.isTutor && (
				<li className='nav-item'>
					<Link to='/become-a-tutor' className='btn btn-info rounded-pill'>
						Become a Tutor
					</Link>
				</li>
			)}
			<li className='nav-item p-2'>
				<div className='dropdown'>
					<button
						type='button'
						className='btn dropdown-toggle btn'
						data-bs-toggle='dropdown'
						aria-expanded='false'
						id='dropdownMenuButton'
						data-target='#'
					>
						<i
							className='fa fa-bell text-primary position-relative'
							onClick={readNotification}
						>
							<span className='position-absolute top-20 start-100 translate-middle badge rounded-pill bg-danger'>
								{count}
							</span>
						</i>
					</button>
					<ul
						className='dropdown-menu notifications'
						role='menu'
						aria-labelledby='dropdownMenuButton'
					>
						<div className='notification-heading'>
							<h4 className='menu-title'>Notifications</h4>
						</div>
						<li className='divider'></li>
						<NotificationMenu />
					</ul>
				</div>
			</li>
			<li className='nav-item'>
				<Link to='/' className='nav-link'>
					Home
				</Link>
			</li>
			<li className='nav-item'>
				<Link to='/dashboard' className='nav-link'>
					Dashboard
				</Link>
			</li>
			<li className='nav-item'>
				<button onClick={logoutUser} className='btn btn-danger'>
					Logout
				</button>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='navbar-nav ms-auto'>
			<li className='nav-item'>
				<Link to='/' className='nav-link'>
					Home
				</Link>
			</li>
			<li className='nav-item'>
				<Link to='/signup' className='nav-link'>
					Signup
				</Link>
			</li>
			<li className='nav-item'>
				<Link to='/signin' className='nav-link'>
					Signin
				</Link>
			</li>
		</ul>
	);
	return (
		<nav className='navbar py-3 navbar-expand-lg bg-dark navbar-dark scrolling-navbar'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					<strong>ChildAcademy</strong>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navmenu'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navmenu'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<Link to='/about-us' className='nav-link'>
								About Us
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/faq' className='nav-link'>
								FAQ
							</Link>
						</li>

						<li className='nav-item'>
							<Link to='/contact-us' className='nav-link'>
								Contact Us
							</Link>
						</li>
					</ul>
					{!loading && (
						<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					)}
				</div>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object,
	logoutUser: PropTypes.func.isRequired,
	readNotification: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile.profile,
	notifications: state.notification.notifications,
});

const mapDispatchToProps = { logoutUser, readNotification };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
