import type { Movie } from "types";
import { Card, Badge } from "@components/base";

type SelectedMovieFields = Pick<Movie, "Title" | "Poster" | "Year" | "Type" | "imdbID">;

type MovieCardProps = {
  movie: SelectedMovieFields;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card
      key={movie.imdbID}
      title={movie.Title}
      imageSrc={movie.Poster}
      imageAlt={movie.Title}
      imageOverlay
      imageCaption={"Released: " + movie.Year}
      imdbID={movie.imdbID}
      link={`/movie/${movie.imdbID}`}
    >
      <div className="absolute bottom-3 left-0 pl-4 w-full flex items-center justify-between">
        <Badge variant={movie.Type === "movie" ? "info" : "primary"}>{movie.Type}</Badge>
      </div>
    </Card>
  );
};

export default MovieCard;
