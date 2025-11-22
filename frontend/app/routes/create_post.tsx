import { Box, Button, Input, Textarea, Field, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ title: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { title: "", text: "" };
    if (!title.trim()) newErrors.title = "Title cannot be empty";
    if (!text.trim()) newErrors.text = "Text cannot be empty";
    setErrors(newErrors);

    if (newErrors.title || newErrors.text) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      await createPost(title, text, token);
      navigate("/posts");
    } catch (err) {
      console.error("Failed to create post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      h="50vh" 
      w="60vw" 
      mx="auto" 
      mt={10} 
      p={6} 
      borderWidth={1} 
      borderRadius="md"
    >

      <Flex 
        h="100%" 
        w="100%" 
        align="center" 
        justify="center"
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          
          <Field.Root mb={4} invalid={!!errors.title}>
            <Field.Label fontSize="2xl" fontWeight="bold">
              Title <Field.RequiredIndicator />
            </Field.Label>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              w="100%"
              size="lg"
              fontSize="2xl"
              padding="16px"
            />

            <Field.HelperText fontSize="lg">Enter the post title</Field.HelperText>
            {errors.title && (
              <Field.ErrorText fontSize="lg">{errors.title}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root mb={4} invalid={!!errors.text}>
            <Field.Label fontSize="2xl" fontWeight="bold">
              Text <Field.RequiredIndicator />
            </Field.Label>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              w="100%"
              size="lg"
              fontSize="2xl"
              padding="16px"
              minH="180px"
            />

            <Field.HelperText fontSize="lg">Enter the post content</Field.HelperText>
            {errors.text && (
              <Field.ErrorText fontSize="lg">{errors.text}</Field.ErrorText>
            )}
          </Field.Root>

          <Button 
            type="submit" 
            colorScheme="blue" 
            loading={loading}
            size="lg"
            fontSize="2xl"
            padding="20px"
          >
            Submit
          </Button>
        </form>
      </Flex>
    </Box>
  );
}
