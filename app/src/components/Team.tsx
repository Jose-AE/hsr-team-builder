import type { FC } from "react";

import { Box, Flex, Image } from "@chakra-ui/react";

import type { ITeamData } from "../types";

const TeamCharacter: FC<{ name_id: string }> = ({ name_id }) => (
  <Box m="3px" bg="gray.700" borderRadius="6px">
    <Image
      borderRadius="6px"
      objectFit="cover"
      height="120px"
      width="120px"
      pointerEvents="none"
      src={
        new URL(`../assets/characters/${name_id}.webp`, import.meta.url).href
      }
    />
  </Box>
);

export const Team: FC<ITeamData> = ({ characters }) => (
  <Box
    boxShadow="lg"
    h="140px"
    maxW="515px"
    userSelect="none"
    borderRadius="6px"
    bg="gray.800"
    p="5px"
  >
    <Flex gap={1}>
      <TeamCharacter name_id={characters[0].name_id} />
      <TeamCharacter name_id={characters[1].name_id} />
      <TeamCharacter name_id={characters[2].name_id} />
      <TeamCharacter name_id={characters[3].name_id} />
    </Flex>
  </Box>
);
