function StudiosForm() {
    return (
        <>
            {location.pathname.includes('edit') ? (
                <h2>Form for EDITING Studio</h2>
            ) : (
                <h2>Form for ADDING Studio</h2>
            )}
        </>
    );
}

export default StudiosForm;
