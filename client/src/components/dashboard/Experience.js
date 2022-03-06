import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { delExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const Experience = ({ experience, setExperience, delExperience }) => {
	return (
		<div className='shadow-none p-3 mb-3 bg-light rounded'>
			<div className='row'>
				<div className='col-8'>
					<h5>
						<strong>{experience.title}</strong>
					</h5>
					<h6>{experience.company}</h6>
				</div>
				<div className='col-4 d-flex align-items-start'>
					<button
						type='button'
						className='btn'
						data-bs-toggle='modal'
						data-bs-target='#experienceForm'
						onClick={() => setExperience(experience)}
					>
						<i className='fa fa-edit'></i>
					</button>
					<button
						type='button'
						className='btn text-danger'
						onClick={() => delExperience(experience._id)}
					>
						<i className='fa fa-trash-alt'></i>
					</button>
				</div>
			</div>
			<p>
				<Moment format='ll'>{experience.from}</Moment> -{' '}
				{experience.to === null ? (
					'Present'
				) : (
					<Moment format='ll'>{experience.to}</Moment>
				)}
			</p>
			<p>{experience.location}</p>
			<p>{experience.description}</p>
		</div>
	);
};

Experience.propTypes = {
	delExperience: PropTypes.func.isRequired,
};

export default connect(null, { delExperience })(Experience);
