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
        url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2830500/b7b3b043d3d61c1f52c1be61b709f0e9f2eb49d3/capsule_616x353.jpg?t=1757603029',
        alt: 'Indiana Jones',
    },
    {
        id: 2,
        title: 'The Star Wars',
        url: 'https://cdn.mos.cms.futurecdn.net/4KDGxhUCBRTxzbWNMzCmVk.jpg',
        alt: 'The Star Wars',
    },
    {
        id: 3,
        title: 'Patriot Games',
        url: 'https://resizing.flixster.com/WvMidlaBXbOX9-8xFzPx-28lkT4=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p14051_v_h8_aa.jpg',
        alt: 'Patriot Games',
    },
    {
        id: 4,
        title: 'Pulp Fiction',
        url: 'https://preview.redd.it/30-years-ago-today-pulp-fiction-was-released-in-us-theaters-v0-vjhotci0bqud1.jpeg?width=640&crop=smart&auto=webp&s=2bf9ec11da5ca12879c9523ed187e63882702850',
        alt: 'Pulp Fiction',
    },
];
