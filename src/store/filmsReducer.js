const SET_FILMS = 'SET_FILMS';

export const setFilms = (films) => ({
  type: SET_FILMS,
  payload: films,
});

export const fetchFilms = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const filmsData = await response.json();

      dispatch(setFilms(filmsData.results));
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };
};

const initialState = {
  films: [],
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export default filmsReducer;
