function DirectorsForm() {
    return (
        <>
            {location.pathname.includes('edit') ? (
                <h2>Form for EDITING Director</h2>
            ) : (
                <h2>Form for ADDING Director</h2>
            )}
        </>
    );
}

export default DirectorsForm;
