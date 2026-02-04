export const BASE_URL = 'http://localhost:5000';

export const MOVIES_SLICE_NAME = 'movies';
export const ACTORS_SLICE_NAME = 'actors';
export const DIRECTORS_SLICE_NAME = 'directors';
export const STUDIOS_SLICE_NAME = 'studios';

export const EMPTY_ACTOR_DATA = {
    id: null,
    movies: [],
    firstName: '',
    lastName: '',
    birthDate: '',
    nationality: '',
    image: '',
};

export const EMPTY_DIRECTOR_DATA = {
    id: null,
    firstName: '',
    lastName: '',
    birthYear: '',
    nationality: '',
    movies: [],
    image: '',
};

export const EMPTY_STUDIO_DATA = {
    id: null,
    title: '',
    location: '',
    foundationYear: '',
    movies: [],
    logo: '',
};

export const EMPTY_MOVIE_DATA = {
    id: null,
    title: '',
    directors: [],
    actors: [],
    studios: [],
    releaseYear: '',
    poster: '',
};
