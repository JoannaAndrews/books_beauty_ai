import { Text, Box } from "@chakra-ui/react";

const LookCard = ({ look }) => {
  if (!look) return null;

  return (
    <Box
      border="2px solid"
      borderColor="teal.400"
      borderRadius="lg"
      p={6}
      maxW="md"
      mx="auto"
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight="semibold" color="teal.500" mb={2}>
        {look.title}
      </Text>
      <Text color="white">
        {look.description}
      </Text>
    </Box>
  );
};

export default LookCard;
