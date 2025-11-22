import { Box, Button, Heading, VStack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/postcard";
import { getPosts } from "../api/post";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const data = await getPosts(token);
        setPosts(data);
      } catch (err: any) {
        if (err.message === "server_error") {
          navigate("/error_page");
        } else {
          setError(err.message || "Failed to load posts");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [navigate]);

  return (
    <Box p={8} h="50vh" w="60vw" mx="auto">
      <Flex mb={6} align="center" justify="space-between">
        <Heading fontSize="3xl">Your Posts</Heading>
        <Button
          colorScheme="teal"
          mb={6}
          fontSize="2xl"
          padding="20px"
          onClick={() => navigate("/create_post")}
        >
          Create New Post
        </Button>
      </Flex>

      {error && (
        <Text color="red.500" fontSize="2xl" mb={4}>
          {error}
        </Text>
      )}

      {loading ? (
        <Text fontSize="2xl">Loading...</Text>
      ) : (
        <VStack gap={4} align="stretch">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}
