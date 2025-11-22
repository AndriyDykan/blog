import { Box, Heading, Input, Button, Text, Link, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth"; 

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError(""); 
    try {
      const data = await register(username, email, password);
     
      navigate("/"); 
    } catch (err: any) {
      if (err.message === "server_error") {
        navigate("/error_page"); 
      } else {
        setError(err.message); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto" mt={16} borderWidth={1} borderRadius="lg" boxShadow="md">
      <VStack gap={4} align="stretch">
        <Heading textAlign="center">Register</Heading>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button colorScheme="teal" onClick={handleRegister} loading={loading}>
          Register
        </Button>


        <Box minH="24px">
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
        </Box>

        <Text textAlign="center">
          Already have an account?{" "}
          <Link color="teal.500" onClick={() => navigate("/")}>
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
