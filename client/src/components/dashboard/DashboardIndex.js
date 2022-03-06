import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Navbar from '../Navbar';
import DashboardNavbar from './Navbar';
import Dashboard from './Dashboard';
import ProfileForm from './ProfileForm';
import MyLessons from './MyLessons';
import { getCurrentProfile } from '../../actions/profile';

const DashboardIndex = ({
	getCurrentProfile,
	auth: { user },
	profile: { loading, profile },
	match: { params },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading || !user || !profile ? (
		<Spinner />
	) : (
		<Fragment>
			<Navbar />
			<DashboardNavbar />
			<div className='container h-75'>
				{!params.pathName ? (
					<Dashboard />
				) : params.pathName === 'profile' ? (
					<ProfileForm />
				) : params.pathName === 'lessons' ? (
					<MyLessons />
				) : null}
			</div>
		</Fragment>
	);
};

DashboardIndex.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile,
});

const mapDispatchToProps = { getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardIndex);
