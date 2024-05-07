import { Box, Flex, Text, Image } from "@chakra-ui/react";

export default function Character() {
  return (
    <Box
      onClick={() => {}}
      maxW="80px"
      borderRadius="5px"
      bg="gray.700"
      _hover={{ bg: "gray.600", cursor: "pointer" }}
    >
      <Image
        src={new URL(`../assets/characters/1307.webp`, import.meta.url).href}
      />

      <Flex
        borderBottomRadius="5px"
        bg="whiteAlpha.200"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="b" textAlign="center" mr="3px">
          {0}
        </Text>
      </Flex>
    </Box>
  );
}
