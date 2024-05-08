import { Box, Flex, Text, Image } from "@chakra-ui/react";

export interface CharacterProps {
  selected: boolean;
  name: string;
  name_id: string;
  onClick: () => void;
}

export default function Character({
  name,
  name_id,
  selected,
  onClick,
}: CharacterProps) {
  return (
    <Box
      userSelect={"none"}
      onClick={() => {
        onClick();
      }}
      borderRadius="5px"
      bg="gray.800"
      _hover={{ bg: "gray.600", cursor: "pointer" }}
    >
      <Image
        objectFit={"cover"}
        height={"100px"}
        width={"100px"}
        pointerEvents={"none"}
        opacity={selected ? 1 : 0.2}
        src={
          new URL(`../assets/characters/${name_id}.webp`, import.meta.url).href
        }
      />

      <Flex
        borderBottomRadius="5px"
        bg="whiteAlpha.300"
        justifyContent="center"
        alignItems="center"
        h={"20px"}
      >
        <Text
          as={"b"}
          fontSize={`${Math.min(10, 8 * (20 / name.length))}px`}
          textAlign="center"
        >
          {name}
        </Text>
      </Flex>
    </Box>
  );
}
