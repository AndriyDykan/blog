import { Box, Heading, Text, IconButton } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { deletePost } from "../api/post";

export default function PostCard({ id, title, content, createdAt }: any) {
  const [deleted, setDeleted] = useState(false);
  const token = localStorage.getItem("token") || "";

  const handleDelete = async () => {
    try {
      await deletePost(id, token);
      setDeleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (deleted) return null;

  return (
    <Box
      position="relative"
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
      mb={4}
    >
      <IconButton
        aria-label="Delete post"
        size="sm"
        colorScheme="red"
        onClick={handleDelete}
        position="absolute"
        top={2}
        right={2}
      >
        <AiOutlineClose />
      </IconButton>

      <Heading size="lg">{title}</Heading>

      <Text fontSize="md" color="gray.500">
        {new Date(createdAt).toLocaleString()}
      </Text>

      <Text mt={2} fontSize="xl">
        {content}
      </Text>
    </Box>
  );
}
