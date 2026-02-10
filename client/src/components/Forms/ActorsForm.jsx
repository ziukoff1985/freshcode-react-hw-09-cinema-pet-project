import { useLocation } from 'react-router-dom';

function ActorsForm() {
    const location = useLocation();
    return (
        <>
            {location.pathname.includes('edit') ? (
                <h2>Form for EDITING Actor</h2>
            ) : (
                <h2>Form for ADDING Actor</h2>
            )}
        </>
    );
}

export default ActorsForm;
