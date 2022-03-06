import React, { Fragment, useRef } from 'react';
import Navbar from './Navbar';
import emailjs from 'emailjs-com';

const ContactUs = () => {
	const formRef = useRef(null);

	const handleOnSubmit = e => {
		e.preventDefault();

		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICE_ID,
				process.env.REACT_APP_TEMPLATE_ID,
				e.target,
				process.env.REACT_APP_USER_ID
			)
			.then(
				result => {
					formRef.current?.reset();

					console.log(result.text);
				},
				error => {
					console.log(error.text);
				}
			);
	};

	return (
		<Fragment>
			<Navbar />
			<div className='container py-4'>
				<h2 className='text-center'>
					<strong>Contact Us</strong>
				</h2>
				<div className='py-3 w-50 m-auto'>
					<h5 className='text-center'>
						ChildAcademy is a non-profit organization providing free, fun,
						curriculum based quality primary education to disadvantaged children
						world wide. It is also a platform to help and support struggling
						parents with their children's
					</h5>
				</div>
				<div className='row py-3'>
					<div className='col-md-6 mb-4'>
						<p>We’d love to hear from you!</p>
						<p>Our usual office hours are Monday-Friday, 9am-5.30pm.</p>
						<div className='py-3'>
							<strong>Head Office address:</strong>
							<p>ChildAcademy Tutoring,</p>
							<p>25 Aylmer House,</p>
							<p>Eastney Street</p>
							<p>Greenwich</p>
							<p>London</p>
						</div>
						<div className='py-2'>
							<strong>Telephone:</strong>
							<p>0203 872 6394</p>
						</div>
						<div>
							<strong>Email:</strong>
							<p>childacademy@gmail.com</p>
						</div>
					</div>
					<div className='col-md-6'>
						<form
							onSubmit={handleOnSubmit}
							ref={formRef}
							className='form shadow-none p-3 mb-5 bg-light rounded'
						>
							<div className='mb-3'>
								<label
									htmlFor='exampleFormControlInput1'
									className='form-label'
								>
									Name
								</label>
								<input
									type='text'
									name='name'
									className='form-control'
									id='exampleFormControlInput1'
									placeholder='John Doe'
									required
								/>
							</div>
							<div className='mb-3'>
								<label
									htmlFor='exampleFormControlInput1'
									className='form-label'
								>
									Email address
								</label>
								<input
									type='text'
									name='email'
									className='form-control'
									id='exampleFormControlInput1'
									placeholder='name@example.com'
									required
								/>
							</div>
							<div className='mb-3'>
								<label
									htmlFor='exampleFormControlInput1'
									className='form-label'
								>
									Phone Number
								</label>
								<input
									type='phone'
									name='phone'
									className='form-control'
									id='exampleFormControlInput1'
									placeholder='+44776366362'
									required
								/>
							</div>
							<div className='mb-3'>
								<label
									htmlFor='exampleFormControlTextarea1'
									className='form-label'
								>
									*Reason for contact: Max(250 charcaters)
								</label>
								<textarea
									className='form-control'
									name='message'
									id='exampleFormControlTextarea1'
									rows='3'
									required
								></textarea>
							</div>
							<div className='d-grid gap-2 col-12 mx-auto'>
								<button className='btn btn-primary btn-lg' type='submit'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ContactUs;
