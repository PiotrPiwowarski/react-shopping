import { useNavigate } from 'react-router-dom';

const BackButtonBar = ({userId}) => {
    const navigate = useNavigate();

    const handleReturnButton = () => {
        navigate('/display-items', {state: {userId}});
    }

    return (
        <div className='headbar'>
            <button onClick={handleReturnButton}>wróć</button>
        </div>
    );
}

export default BackButtonBar;