import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
    return (
        <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 150, width: 130 }} >
            <div className="Tilt-inner br3 ma2 pv3 shadow-2" style={{backgroundImage: `linear-gradient(to right, rgb(221, 39, 215), rgb(35, 225, 203))`}}>
                <img style={{height: 80, width: 80}} alt='logo' src={brain} />
            </div>
        </Tilt>
    );
}

export default Logo;