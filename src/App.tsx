import Row from "./pages/Row";
import requests from "./requests";
import Banner from "./components/Banner";
import './App.css'
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Banner />
        <Row
          title="NetFlix Original"
          fetchURL={requests.fetchNetflixOriginals}
          isLargeRow={true}
        />
        <Row
          title="Trending Now"
          fetchURL={requests.fetchTrending}
          isLargeRow={false}
        />
        <Row
          title="Top Rated"
          fetchURL={requests.fetchTopRated}
          isLargeRow={false}
        />
        <Row
          title="Action Movies"
          fetchURL={requests.fetchActionMovies}
          isLargeRow={false}
        />
        <Row
          title="Comedy Movies"
          fetchURL={requests.fetchComedyMovies}
          isLargeRow={false}
        />
        <Row
          title="Horror Movies"
          fetchURL={requests.fetchHorrorMovies}
          isLargeRow={false}
        />
        <Row
          title="Romance Movies"
          fetchURL={requests.fetchRomanceMovies}
          isLargeRow={false}
        />
        <Row
          title="Documentaries"
          fetchURL={requests.fetchDocumentaries}
          isLargeRow={false}
        />
      </div>
    </>
  );
}

export default App;
