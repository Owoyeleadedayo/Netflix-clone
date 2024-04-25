import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import requests from "../requests";
import instance from "../axios";
import './Banner.css'

interface Movie {
  id: number;
  backdrop_path: string;
  original_name: string;
  name: string;
  title: string;
  overview: string;
}

const Banner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get(requests.fetchNetflixOriginals);
        const randomIndex = Math.floor(
          Math.random() * response.data.results.length - 1
        );
        setMovie(response.data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return requests;
    }
    fetchData();
  }, []);

  if (!movie) {
    return null;
  }

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Flex
      bgSize={"cover"}
      bgImage={`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      color={"white"}
      objectFit={"contain"}
      height={"530px"}
    >
      <Flex ml={"30px"} pt={"140px"} height={"190px"} flexDirection={"column"}>
        <Text as={"h1"} fontSize={"3rem"} fontWeight={800} pb={"0.3rem"}>
          {movie?.title || movie?.name || movie?.original_name}
        </Text>
        <Flex>
          <Button
            cursor={"pointer"}
            color={"#fff"}
            outline={"none"}
            border={"none"}
            fontWeight={700}
            borderRadius={"0.2vw"}
            pl={"2rem"}
            pr={"2rem"}
            mr={"1rem"}
            pt={"0.5rem"}
            pb={"0.5rem"}
            backgroundColor={"rgba(51, 51, 51, 0.5)"}
            _hover={{
              color: "#000",
              backgroundColor: "#e6e6e6",
              transition: "all 0.2s",
            }}
          >
            Play
          </Button>
          <Button
            cursor={"pointer"}
            color={"#fff"}
            outline={"none"}
            border={"none"}
            fontWeight={700}
            borderRadius={"0.2vw"}
            pl={"2rem"}
            pr={"2rem"}
            mr={"1rem"}
            pt={"0.5rem"}
            pb={"0.5rem"}
            backgroundColor={"rgba(51, 51, 51, 0.5)"}
            _hover={{
              color: "#000",
              backgroundColor: "#e6e6e6",
              transition: "all 0.2s",
            }}
          >
            My List
          </Button>
        </Flex>
        <Text
          as={"h2"}
          width={"45rem"}
          lineHeight={1.3}
          pt={"1rem"}
          fontSize={"0.8rem"}
          maxW={"360px"}
          h={"80px"}
        >
          {truncate(movie?.overview, 150)}
        </Text>
      </Flex>
      <div
        className="footer"
      />
    </Flex>
  );
};

export default Banner;
