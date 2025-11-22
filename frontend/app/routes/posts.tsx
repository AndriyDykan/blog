
import { Box, Button, Heading, VStack,Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/postcard";
import { getPosts } from "../api/post";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts(); 
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <Box p={8} maxW="3xl" mx="auto">
      <Heading mb={4}>Your Posts</Heading>
      <Button colorScheme="teal" mb={6} onClick={() => navigate("/create-post")}>
        Create New Post
      </Button>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <VStack gap={4} align="stretch">
          {posts.map((post) => (
            <PostCard
              key={post.id}
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
