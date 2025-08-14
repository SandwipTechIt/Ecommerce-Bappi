import { useEffect } from 'react';
import { setContext } from '../../context/authContext';
import { useNavigate } from 'react-router';


export default () => {
    const { dispatch } = setContext();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'Logout' });
        navigate('/');
    }, [])
    return (
        <div>
            <h1>Sign Out</h1>
        </div>
    )
}
