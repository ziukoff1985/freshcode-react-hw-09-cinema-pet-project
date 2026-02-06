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

export const posters = [
    {
        id: 1,
        title: 'Indiana Jones',
        url: 'https://upload.wikimedia.org/wikipedia/ru/7/79/Indiana-jones-raiders-of-lost-ark-poster.jpg',
        alt: 'Indiana Jones',
    },
    {
        id: 2,
        title: 'The Star Wars',
        url: 'https://upload.wikimedia.org/wikipedia/ru/8/87/StarWarsMoviePoster1977.jpg',
        alt: 'The Star Wars',
    },
    {
        id: 3,
        title: 'Patriot Games',
        url: 'https://upload.wikimedia.org/wikipedia/ru/2/2a/Patriot_games_film_poster.jpg',
        alt: 'Patriot Games',
    },
    {
        id: 4,
        title: 'Pulp Fiction',
        url: 'https://upload.wikimedia.org/wikipedia/ru/9/93/Pulp_Fiction.jpg',
        alt: 'Pulp Fiction',
    },
];
