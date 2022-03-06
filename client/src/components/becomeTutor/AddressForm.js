import React from 'react';
import PropTypes from 'prop-types';

const AddressForm = ({
	formData,
	handleOnChange,
	prevStep,
	handleOnSubmit,
}) => {
	const {
		addressLine1,
		addressLine2,
		city,
		county,
		country,
		postcode,
		emergencyName,
		emergencyNumber,
	} = formData;
	return (
		<div className='my-5 mx-auto' style={{ maxWidth: '540px' }}>
			<h2 className='mb-3 text-primary text-center'>Contact Address</h2>
			<form onSubmit={handleOnSubmit} className='form row g-3'>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='* Address line 1'
						name='addressLine1'
						id='floatingInput'
						value={addressLine1}
						onChange={handleOnChange}
						required
					/>
					<label htmlFor='floatingInput'>Address line 1</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='Address line 2'
						name='addressLine2'
						onChange={handleOnChange}
						id='floatingInput'
						value={addressLine2}
					/>
					<label htmlFor='floatingInput'>Address line 2</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='City'
						name='city'
						onChange={handleOnChange}
						id='floatingInput'
						value={city}
						required
					/>
					<label htmlFor='floatingInput'>* City</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='* County'
						name='county'
						onChange={handleOnChange}
						id='floatingInput'
						value={county}
						required
					/>
					<label htmlFor='floatingInput'>* County</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='* Postcode'
						name='postcode'
						onChange={handleOnChange}
						id='floatingInput'
						value={postcode}
						required
					/>
					<label htmlFor='floatingInput'>* Postcode</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='* Country'
						name='country'
						onChange={handleOnChange}
						id='floatingInput'
						value={country}
						required
					/>
					<label htmlFor='floatingInput'>* Country</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='* Emergency name'
						name='emergencyName'
						onChange={handleOnChange}
						id='floatingInput'
						value={emergencyName}
						required
					/>
					<label htmlFor='floatingInput'>* Emergency name</label>
				</div>
				<div className='form-floating col-md-6'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='* Emergency number'
						name='emergencyNumber'
						onChange={handleOnChange}
						id='floatingInput'
						value={emergencyNumber}
						required
					/>
					<label htmlFor='floatingInput'>* Emergency number</label>
				</div>
				<div className='row p-0 my-4 mx-auto'>
					<div className='col d-grid '>
						<button
							className='btn btn-secondary'
							type='button'
							onClick={prevStep}
						>
							Back
						</button>
					</div>
					<div className='col d-grid '>
						<button className='btn btn-primary' type='submit'>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

AddressForm.propTypes = {
	formData: PropTypes.object.isRequired,
	handleOnChange: PropTypes.func.isRequired,
};

export default AddressForm;
