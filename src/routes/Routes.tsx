import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "@layouts/index";
import Home from "./Home";
import Movie from "./Movie";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route
          path="*"
          element={<h1 className="text-center my-4 font-bold">Page Not Found</h1>}
        />
      </Route>
    </Routes>
  );
}
