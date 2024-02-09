export const FETCH_HERO_DETAILS_START = 'FETCH_HERO_DETAILS_START';
export const FETCH_HERO_DETAILS_SUCCESS = 'FETCH_HERO_DETAILS_SUCCESS';
export const FETCH_HERO_DETAILS_ERROR = 'FETCH_HERO_DETAILS_ERROR';

export const fetchHeroDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_HERO_DETAILS_START, payload: id });

    const heroResponse = await axios.get(`https://swapi.dev/api/people/${id}/`);
    if (!heroResponse.ok) {
      throw new Error(`Error fetching hero details: ${heroResponse.statusText}`);
    }
    const heroData = await heroResponse.json();

    const filmsData = await Promise.all(
      heroData.films.map(async (filmUrl) => {
        const filmResponse = await axios.get(filmUrl);
        if (!filmResponse.ok) {
          throw new Error(`Error fetching film details: ${filmResponse.statusText}`);
        }
        return filmResponse.json();
      })
    );

    dispatch({ type: FETCH_HERO_DETAILS_SUCCESS, payload: { hero: heroData, films: filmsData } });
  } catch (
error) {
    dispatch({ type: 'FETCH_HERO_DETAILS_ERROR', payload: error.message });
  }
};
