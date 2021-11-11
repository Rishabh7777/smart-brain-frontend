import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onDetect}) => {
	return (
		<div style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',
			marginBottom: '20px'}} className='pv3 shadow-3'>
			<p className='f3 white mt0'>
				{'This is a smart brain, it will detect faces in your images. Try it.'}
			</p>
			<div style={{marginLeft: 'auto', marginRight: 'auto'}}
				className='form pa4 ma2 br2'>
				<input type='text' placeholder='Image url' className='f3'
					onChange={onInputChange}></input>
				<button className='f3 grow' onClick={onDetect}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkForm;