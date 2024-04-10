import { Input, Button } from "@components/base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FilterState } from "@store/moviesSlice";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import Check from "@assets/icons/Check";
import Cross from "@assets/icons/Cross";

type MovieFilterBarProps = {
  onSubmit: (values: FilterState) => void;
};

const MovieFilterBar: React.FC<MovieFilterBarProps> = ({ onSubmit }) => {
  const type = useSelector((state: RootState) => state.movies.type || "");
  const year = useSelector((state: RootState) => state.movies.year || "");
  const formik = useFormik({
    initialValues: {
      year: year,
      type: type,
    },
    validationSchema: Yup.object({
      year: Yup.number().min(1900).max(2024),
      type: Yup.string().oneOf(["movie", "series", "episode"]),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
    onReset: () => {
      onSubmit({ year: "", type: "" });
    },
  });

  function handleYearBlur() {
    if (formik.touched.year && !formik.errors.year) {
      onSubmit(formik.values);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="py-2 my-3 italic block md:hidden border-b-2 border-slate-200">
        Filter:
      </div>
      <form onSubmit={formik.handleSubmit} className="flex mt-4 items-center">
        <div className="flex items-center">
          <div className="mr-2 italic hidden md:block">Filter:</div>
          {formik.values.year || formik.values.type ? (
            <Button
              variant="light"
              size="small"
              onClick={() => formik.resetForm()}
              icon={<Cross />}
            />
          ) : null}
        </div>
        <div className="flex-none items-center mx-2">
          <select
            className="py-3 px-4 md:px-6 block rounded-md shadow-sm appearance-none border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value="">Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>

          {formik.touched.type && formik.errors.type ? (
            <div className="text-red-500 text-xs italic">{formik.errors.type}</div>
          ) : null}
        </div>
        <Input
          placeholder="Year..."
          containerClassName="flex items-center"
          name="year"
          onChange={formik.handleChange}
          onBlur={handleYearBlur}
          value={formik.values.year}
        />
        {formik.touched.year && formik.errors.year ? (
          <div className="text-red-500 text-xs italic">{formik.errors.year}</div>
        ) : null}
        <Button
          type="submit"
          variant="link"
          size="large"
          onClick={() => onSubmit(formik.values)}
          icon={<Check />}
        >
          <span className="hidden md:block">Apply</span>
        </Button>
      </form>
      </div>
  );
};

export default MovieFilterBar;
