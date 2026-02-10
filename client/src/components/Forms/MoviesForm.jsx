function MoviesForm() {
    return (
        <>
            {location.pathname.includes('edit') ? (
                <h2>Form for EDITING Movie</h2>
            ) : (
                <h2>Form for ADDING Movie</h2>
            )}
        </>
    );
}

export default MoviesForm;
