import { useEffect, useState } from "react";
import instance from "../axios";
import { Flex, Image, Text } from "@chakra-ui/react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

interface RowProps {
  title: string;
  fetchURL: string;
  isLargeRow: boolean;
}

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
}

const base_url = "https://image.tmdb.org/t/p/original/";

const Row: React.FC<RowProps> = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null); // Changed trailerUrl state type

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get<{ results: Movie[] }>(fetchURL);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    // Make handleClick function asynchronous
    try {
      if (trailerUrl) {
        setTrailerUrl(null); // Reset trailerUrl if already set
      } else {
        const url: string = await movieTrailer(movie?.name || ""); // Await movieTrailer function call
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoID: string | null = urlParams.get("v");
        setTrailerUrl(videoID);
      }
    } catch (error) {
      console.error("Error fetching trailer URL:", error);
      setTrailerUrl(null); // Reset trailerUrl if error occurs
    }
  };

  return (
    <Flex paddingX="10px" flexDirection="column" color="#fff" pt={"20px"}>
      <Text as={"h1"} fontSize={"24px"} fontFamily={"Lato"} fontWeight={600}>
        {title}
      </Text>
      <Flex
        overflowX="scroll"
        overflowY="hidden"
        padding="20px"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {movies.map((movie) => (
          <Image
            key={movie?.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie?.name}
            sx={{
              w: "100%",
              objectFit: "contain",
              maxH: "100px",
              mr: "8px",
              transition: "transform 450ms",
              _hover: {
                transform: "scale(1.08)",
              },
              ...(isLargeRow && {
                maxH: "250px",
                _hover: {
                  transform: "scale(1.09)",
                },
              }),
            }}
          />
        ))}
      </Flex>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </Flex>
  );
};

export default Row;
