import { Input, Button } from "@components/base";
import { useFormik } from "formik";
import * as Yup from "yup";
import Search from "@assets/icons/Search";
import { useSelector } from "react-redux";
import { RootState } from "store";

type MovieSearchBarProps = {
  onSubmit: (values: { search: string }) => void;
  onSearchStart: () => void;
};

const MovieSearchBar: React.FC<MovieSearchBarProps> = ({ onSubmit, onSearchStart }) => {
  const searchTerm = useSelector(
    (state: RootState) => state.movies.searchTerm || "Pokemon"
  );

  const formik = useFormik({
    initialValues: {
      search: searchTerm,
    },
    validationSchema: Yup.object({
      search: Yup.string(),
    }),
    onSubmit: (values) => {
      onSearchStart();
      onSubmit(values);
    },
  });

  const handleFocus = () => {
    formik.setFieldValue("search", "");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={formik.handleSubmit} className="flex md:px-24 mt-4 items-center">
        <Input
          placeholder="Search..."
          containerClassName="flex mr-2"
          name="search"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          value={formik.values.search}
        />
        <Button variant="secondary" size="small" type="submit" icon={<Search />}>
          Search
        </Button>
      </form>
      {formik.touched.search && formik.errors.search ? (
        <div className="text-red-500 text-sm italic">{formik.errors.search}</div>
      ) : null}
    </div>
  );
};

export default MovieSearchBar;
