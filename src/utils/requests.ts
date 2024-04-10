import type { Movie, MovieSearchResult } from "types";
const apikey = process.env.REACT_APP_OMDB_API_KEY
const apiUrl = "https://www.omdbapi.com/";

export const fetchMovies = async (
  searchTerm: string,
  page: number,
  year?: string,
  type?: string
): Promise<MovieSearchResult> => {
  let query = `${apiUrl}?apikey=${apikey}&s=${searchTerm}&page=${page}`;
  if (year) query += `&y=${year}`;
  if (type) query += `&type=${type}`;

  try {
    const response = await fetch(query);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {} as MovieSearchResult;
  }
};

export const fetchMovie = async (imdbID: string): Promise<Movie> => {
  try {
    const response = await fetch(`${apiUrl}?apikey=${apikey}&i=${imdbID}&plot=full`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {} as Movie;
  }
};
