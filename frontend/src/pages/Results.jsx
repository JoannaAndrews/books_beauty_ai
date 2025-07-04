import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Spinner, SimpleGrid, Text } from "@chakra-ui/react";
import LookCard from "../components/LookCard";
import { getLooksForBook } from "../services/bookAPI";

const Results = () => {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getLooksForBook(query);
  //     // console.log("API response:", response);
  //     // console.log("Query is:", query);
  //     // console.log("Looks from API response:", response?.data);

  //     // console.log("Looks are:", looks);

  //     setLooks(response?.data || []);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [query]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      if (!query) return;

      setLoading(true);
      const response = await getLooksForBook(query);

      if (!isCancelled) {
        setLooks(response?.data || []);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true; // prevent setting state after unmount
    };
  }, [query]);


  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={8}>
      <Text fontSize="xl" mb={4}>Inspired looks for <strong color="white">{query}</strong>:</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {looks.map((look, index) => (
          <LookCard key={index} look={look} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Results;
