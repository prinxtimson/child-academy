import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import AboutYouForm from './AboutYouForm';
import AddressForm from './AddressForm';
import Navbar from '../Navbar';
import { becomeTutor } from '../../actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const BecomeTutor = ({ becomeTutor, history }) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		bio: '',
		subjects: '',
		levels: '',
		isAdult: false,
		speakEnglish: false,
		ukResident: false,
		daysAvailable: [],
		addressLine1: '',
		addressLine2: '',
		city: '',
		county: '',
		country: '',
		postcode: '',
		emergencyName: '',
		emergencyNumber: '',
	});

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const handleOnChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleDayClick = day => {
		const index = formData.daysAvailable.findIndex(item => item === day);
		let daysAvailable = formData.daysAvailable;
		if (index === -1) {
			daysAvailable.push(day);
		} else {
			daysAvailable = daysAvailable.filter(item => item !== day);
		}
		setFormData({ ...formData, daysAvailable });
	};

	const handleCheckClick = e => {
		setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		becomeTutor(formData, history);
	};

	switch (step) {
		case 1:
			return (
				<Fragment>
					<Navbar />
					<AboutYouForm
						formData={formData}
						handleOnChange={handleOnChange}
						handleDayClick={handleDayClick}
						handleCheckClick={handleCheckClick}
						nextStep={nextStep}
					/>
				</Fragment>
			);
		case 2:
			return (
				<Fragment>
					<Navbar />
					<AddressForm
						formData={formData}
						handleOnChange={handleOnChange}
						prevStep={prevStep}
						handleOnSubmit={handleOnSubmit}
					/>
				</Fragment>
			);
		default:
			return;
	}
};

//
BecomeTutor.propTypes = {
	becomeTutor: PropTypes.func.isRequired,
};

export default connect(null, { becomeTutor })(withRouter(BecomeTutor));
