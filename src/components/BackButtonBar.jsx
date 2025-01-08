import { useNavigate } from 'react-router-dom';

const BackButtonBar = () => {
    const navigate = useNavigate();

    const handleReturnButton = () => {
        navigate('/display-items');
    }

    return (
        <div className='headbar'>
            <button onClick={handleReturnButton}>wróć</button>
        </div>
    );
}

export default BackButtonBar;