import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { delEducation } from '../../actions/profile';
import { connect } from 'react-redux';

const Education = ({ edu, setEducation, delEducation }) => {
	return (
		<div className='shadow-none p-3 mb-3 bg-light rounded'>
			<div className='row'>
				<div className='col-8'>
					<h5>
						<strong>{edu.school}</strong>
					</h5>
					<h6>
						<span>{edu.degree}</span> - <span>{edu.fieldOfStudy}</span>
					</h6>
				</div>
				<div className='col-4 d-flex align-items-start'>
					<button
						type='button'
						className='btn btn-light'
						data-bs-toggle='modal'
						data-bs-target='#educationForm'
						onClick={() => setEducation(edu)}
					>
						<i className='fa fa-edit'></i>
					</button>
					<button
						type='button'
						className='btn text-danger'
						onClick={() => delEducation(edu._id)}
					>
						<i className='fa fa-trash-alt'></i>
					</button>
				</div>
			</div>
			<p>
				<Moment format='ll'>{edu.from}</Moment> -{' '}
				{edu.to === null ? 'Present' : <Moment format='ll'>{edu.to}</Moment>}
			</p>
			<p>{edu.description}</p>
		</div>
	);
};

Education.propTypes = {
	delEducation: PropTypes.func.isRequired,
};

export default connect(null, { delEducation })(Education);
