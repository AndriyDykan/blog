import { Box, Heading, Text } from "@chakra-ui/react";

interface PostCardProps {
  title: string;
  content: string;
  createdAt: string;
}

export default function PostCard({ title, content, createdAt }: PostCardProps) {
  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
      <Heading size="md">{title}</Heading>
      <Text fontSize="sm" color="gray.500">
        {new Date(createdAt).toLocaleString()}
      </Text>
      <Text mt={2}>{content}</Text>
    </Box>
  );
}
