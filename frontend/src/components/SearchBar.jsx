import { Center, Input, Button, VStack, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent refresh
  //   navigate(`/results?query=${encodeURIComponent(query)}`);
  // };


  return (
    <Center minH="100vh">

      <Box
        border="2px solid"
        borderColor="teal.400"
        borderRadius="lg"
        p={6}
        maxW="md"
        mx="auto"
        textAlign="center"
      >


        {/* <VStack spacing={6} align="center">
          <Heading>Search for a Book to Get Makeup Inspiration: </Heading>
          <Input placeholder='Book Name' value={query} onChange={(e) => setQuery(e.target.value)}
          ></Input>
          <Button onClick={handleSearch} width="100%" backgroundColor="teal.400">Search</Button>
        </VStack> */}

        <form onSubmit={handleSearch}>
          <VStack spacing={6} align="center">
            <Heading>Search for a Book to Get Makeup Inspiration: </Heading>
            <Input
              placeholder="Book Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" width="100%" backgroundColor="teal.400">
              Search
            </Button>
          </VStack>
        </form>



      </Box>
    </Center>
  )
}

export default SearchBar