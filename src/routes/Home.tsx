import { useEffect, useState } from "react";
import { MovieList, MovieFilterBar, MovieSearchBar } from "@components/feature";
import { Pagination } from "@components/base";
import Loading from "@components/block/Loading";
import Failed from "@components/block/Failed";
import { useAppDispatch, RootState } from "@store/index";
import {
  fetchMoviesAsync,
  updateSearchTerm,
  updateFilter,
  FilterState,
} from "@store/moviesSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const totalResults = useSelector((state: RootState) => state.movies.totalResults);
  const searchTerm = useSelector((state: RootState) => state.movies.searchTerm || "");
  const type = useSelector((state: RootState) => state.movies.type);
  const year = useSelector((state: RootState) => state.movies.year);

  useEffect(() => {
    dispatch(fetchMoviesAsync({ searchTerm, page: currentPage, type, year }));
  }, [searchTerm, currentPage, type, year, dispatch]);

  function handleSearchTermChange(values: { search: string }) {
    dispatch(updateSearchTerm(values.search));
  }

  function handleFilterChange(values: FilterState) {
    dispatch(updateFilter(values));
  }

  function handleSearchStart() {
    setCurrentPage(1); // Reset page/current page
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <Failed message="Broken!" />;
  }

  let totalPages = Math.ceil(totalResults / 10);
  totalPages = Math.max(totalPages, 0);

  return (
    <>
      <MovieSearchBar onSubmit={handleSearchTermChange} onSearchStart={handleSearchStart}/>
      <MovieFilterBar onSubmit={handleFilterChange} />
      {!movies ? (
        <div className="flex justify-center items-center h-screen">No results found for "{searchTerm}".</div>
      ) : (
        <>
          <MovieList movies={movies} searchTerm={searchTerm} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => handlePageChange(page)}
            alignment="center"
          />
        </>
      )}
    </>
  );
};

export default Home;