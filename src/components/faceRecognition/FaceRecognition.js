import './FaceRecognition.css';

const FaceRecognition = ({imageInput, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='input-image' alt='' src={imageInput} width='500px' heigh='auto'
                    style={{marginBottom: '10px'}}
                />
                {/* the box aroung the face */}
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol,
                    bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;