import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"             
      display="flex"             
      flexDirection="column"     
      alignItems="center"       
      justifyContent="center"    
      textAlign="center"
      px={6}
    >
      <Heading
        as="h1"
        fontSize={{ base: "8rem", md: "12rem", lg: "16rem" }}
        color="teal.500"
        lineHeight="1"            
      >
        404
      </Heading>
      <Text fontSize={{ base: "1.5rem", md: "2rem" }} mt={4} mb={6}>
        Page not found
      </Text>
      <Button colorScheme="teal" size="lg" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}
