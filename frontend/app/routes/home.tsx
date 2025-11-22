import { Box, Heading, Input, Button, Text, Link, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(""); 
    try {
      const data = await login(email, password);
      
      
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/posts");
      } else {
        setError("Login failed: no token received");
      }

    } catch (err: any) {
      if (err.message === "server_error") {
        navigate("/error_page"); 
      } else if (err.message === "wrong password or email") {
        setError("Wrong email or password"); 
      } else {
        setError(err.message); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={8}
      maxW="xl"
      mx="auto"
      mt={16}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack gap={4} align="stretch">
        <Heading textAlign="center">Login</Heading>

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

        <Button colorScheme="teal" onClick={handleLogin} loading={loading}>
          Log In
        </Button>

     
        <Box minH="24px">
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
        </Box>

        <Text textAlign="center">
          Don't have an account?{" "}
          <Link color="teal.500" onClick={() => navigate("/register")}>
            Register
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
