import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Spinner, SimpleGrid, Text, Button } from "@chakra-ui/react";
import LookCard from "../components/LookCard";
import { getLooksForBook } from "../services/bookAPI";

const Results = () => {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search).get("query");

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
    <>
      <Box p={8}>
        <Text fontSize="xl" mb={4}>Inspired looks for <strong color="white">{query}</strong>:</Text>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {looks.map((look, index) => (
            <LookCard key={index} look={look} />
          ))}
        </SimpleGrid>
      </Box>

      <Box textAlign="center">
        <Button onClick={() => navigate('/')} backgroundColor="teal.400"> Try Another Book </Button>
      </Box>

    </>

  );
};

export default Results;
