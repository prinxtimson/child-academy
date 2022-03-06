import React, { Fragment } from 'react';
import Navbar from './Navbar';

const AboutUs = () => {
	return (
		<Fragment>
			<Navbar />
			<div className='container py-5'>
				<h2 className='text-center'>
					<strong>About Us</strong>
				</h2>
				<div className='py-3 w-50 m-auto'>
					<h5 className='text-center'>
						ChildAcademy is a non-profit organization providing free, fun,
						curriculum based quality primary education to disadvantaged children
						world wide.
					</h5>
				</div>
				<div className='py-5'>
					<h4>OUR VALUES</h4>
					<div className='d-flex py-3 flex-wrap'>
						<div className='diamond'>Transparency</div>
						<div className='diamond'>Integrity</div>
						<div className='diamond'>Fun Learning</div>
						<div className='diamond'>Excellency</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AboutUs;
