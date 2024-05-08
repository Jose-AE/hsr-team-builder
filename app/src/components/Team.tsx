import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { ITeamData } from "../data/teams.data";

function Character({ name_id }: { name_id: string }) {
  return (
    <Box m={"3px"} bg={"gray.700"} borderRadius={"6px"}>
      <Image
        borderRadius={"6px"}
        objectFit={"cover"}
        height={"120px"}
        width={"120px"}
        pointerEvents={"none"}
        src={
          new URL(`../assets/characters/${name_id}.webp`, import.meta.url).href
        }
      />
    </Box>
  );
}

export default function Team({ characters, primaryCharacter }: ITeamData) {
  return (
    <Box
      boxShadow={"lg"}
      h={"140px"}
      maxW={"515px"}
      userSelect={"none"}
      borderRadius="6px"
      bg="gray.800"
      p={"5px"}
    >
      <Flex gap={1}>
        <Character name_id={characters[0].name_id} />
        <Character name_id={characters[1].name_id} />
        <Character name_id={characters[2].name_id} />
        <Character name_id={characters[3].name_id} />
      </Flex>
    </Box>
  );
}
