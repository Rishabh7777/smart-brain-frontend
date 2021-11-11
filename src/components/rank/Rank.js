const Rank = ({name, entries}) => {
	return (
		<div>
			<p style={{marginBottom: '0'}} className='f3 white mt0'>
				{`${name}, your current entry count is...`}
			</p>
			<p style={{marginTop: '0'}} className='f2 white mb1'>{`${entries}`}</p>
		</div>
	);
}

export default Rank;