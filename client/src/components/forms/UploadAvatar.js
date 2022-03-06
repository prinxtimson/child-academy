import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar } from '../../actions/auth';

const UploadAvatar = ({ user, uploadAvatar }) => {
	const [inputRef, setInputRef] = useState(null);

	const handleUploadAvatar = img => {
		const file = new FormData();
		file.append('avatar', img);
		uploadAvatar(file);
	};

	return (
		<div>
			<img
				src={user.avatar}
				alt={user.name}
				className='rounded mx-auto d-block'
				style={{ maxWidth: '100%' }}
			/>
			<input
				type='file'
				onChange={e => handleUploadAvatar(e.target.files[0])}
				name='avatar'
				id='avatar'
				className='hide'
				style={{ display: 'none' }}
				accept='image/*'
				ref={ref => setInputRef(ref)}
			/>
			<div className='d-grid gap-2 py-3 col-12 mx-auto'>
				<button
					className='btn btn-primary btn-lg'
					onClick={() => inputRef?.click()}
					type='button'
				>
					Upload
				</button>
			</div>
		</div>
	);
};

UploadAvatar.propTypes = {
	user: PropTypes.object.isRequired,
	uploadAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { uploadAvatar })(UploadAvatar);
