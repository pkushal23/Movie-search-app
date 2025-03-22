import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import "./css/App.css";
import Favorite from "./pages/favorites";
import Home from "./pages/home";
import MovieDetails from "./pages/Moviedetails";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <MovieProvider>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorite />}/>
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </main>
    </MovieProvider>
  );
}

export default App;