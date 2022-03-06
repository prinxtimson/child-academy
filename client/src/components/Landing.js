import React, { Fragment, useState } from 'react';
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router-dom';
import student_and_teacher from '../images/student_and_teacher.jpg';

const Landing = () => {
	const [subject, setSubject] = useState('');
	const [level, setLevel] = useState('');
	let history = useHistory();

	const handleOnSearch = e => {
		e.preventDefault();
		history.push(`/search/${subject || 'All subject'},${level || 'All level'}`);
	};
	return (
		<Fragment>
			<HomeNavbar />
			<div className='container-fluid p-0'>
				<section
					className='text-light-p-5'
					style={{
						backgroundImage: `url(${student_and_teacher})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						height: '100vh',
					}}
				>
					<div
						className='d-flex align-items-center justify-content-center'
						style={{ height: '100%' }}
					>
						<form
							onSubmit={handleOnSearch}
							className='form row p-2 Glass container-md'
						>
							<div className='col-md-5'>
								<select
									placeholder='Subject'
									value={subject}
									onChange={e => setSubject(e.target.value)}
									className='form-control-plaintext p-3'
									aria-label='.form-select-lg example'
								>
									<option value=''>Select Subject</option>
									<option value='Maths'>Maths</option>
									<option value='English'>English</option>
									<option value='Science'>Science</option>
									<option value='ICT'>ICT</option>
								</select>
							</div>
							<div className='col-md-5'>
								<select
									placeholder='Level'
									value={level}
									onChange={e => setLevel(e.target.value)}
									className='form-control-plaintext p-3'
									aria-label='.form-select-lg example'
								>
									<option value=''>Select Level</option>
									<option value='Year 1'>Year 1</option>
									<option value='Year 2'>Year 2</option>
									<option value='Year 3'>Year 3</option>
									<option value='Year 4'>Year 4</option>
									<option value='Year 5'>Year 5</option>
									<option value='Year 6'>Year 6</option>
								</select>
							</div>
							<div className='col-md-2 d-grid'>
								<button className='btn btn-primary btn-lg' type='submit'>
									Search
								</button>
							</div>
						</form>
					</div>
				</section>
			</div>
		</Fragment>
	);
};

export default Landing;
