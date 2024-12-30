import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Box,
  Grid,
} from "@chakra-ui/react";

import { Character } from "./components/Character";
import { Team } from "./components/Team";

import { CHARACTERS } from "./data/characters.data";
import { TEAMS } from "./data/teams.data";
import { CharacterSearch } from "./components/CharacterSearch";
import { filterTeamsByCharacters } from "./helpers/filterTeamsByCharacters";
import { filterDuplicateTeams } from "./helpers/filterDuplicateTeams";
import { ICharacterData } from "./types";

interface ICharacter extends ICharacterData {
  selected: boolean;
  name: string;
  name_id: string;
}

function App() {
  // Set dark mode on mount
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  const [characterFilter, setCharacterFilter] = useState("");
  const [characters, setCharacters] = useState<ICharacter[]>(
    CHARACTERS.map((c) => ({
      name: c.name,
      name_id: c.name_id,
      selected: false,
    }))
  );

  const filteredCharacters = useMemo(() => {
    if (!characterFilter?.length) {
      return characters;
    }

    return characters.filter((c) =>
      c.name.toLowerCase().includes(characterFilter.toLowerCase())
    );
  }, [characterFilter, characters]);

  const selectedCharacters = useMemo(
    () => characters.filter((char) => char.selected),
    [characters]
  );

  const filteredTeams = useMemo(() => {
    if (!selectedCharacters?.length) {
      return [];
    }

    return filterDuplicateTeams(
      filterTeamsByCharacters(TEAMS, selectedCharacters)
    );
  }, [selectedCharacters]);

  return (
    <>
      <Box
        position="fixed"
        bottom={0} // Position at the bottom
        right={0} // Position at the right
        p={2}
        m="5px"
        borderRadius="100%"
        zIndex={9999}
        bgColor="rgba(0, 0, 0, 0.5)"
      >
        <a href="https://github.com/Jose-AE/hsr-team-builder" target="_blank">
          <FaGithub />
        </a>
      </Box>

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w="full"
          maxW="xl"
          bg={useColorModeValue("white", "gray.700")}
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          {/*---------------------------Character --------------------------------------*/}

          <Flex gap={5}>
            <Box width="50%" py="5px" borderWidth="1px" borderRadius="md">
              <Flex alignItems="center" justify="center">
                <Text userSelect="none" mr="5px">
                  Available Characters
                </Text>
                <Image
                  h={5}
                  w={5}
                  src="https://i.imgur.com/BHGnYJU.png"
                  alt="Char"
                />
              </Flex>
            </Box>

            <Flex gap={2} width="50%">
              <CharacterSearch
                onChange={(value) => setCharacterFilter(value)}
                onClear={() => {
                  setCharacters([
                    ...characters.map((c) => {
                      c.selected = false;
                      return c;
                    }),
                  ]);
                }}
              />
            </Flex>
          </Flex>

          <Flex p="5px" borderWidth="1px" borderRadius="md" w="100%">
            <Grid
              overflowX="hidden"
              overflowY="auto"
              h="400px"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              templateColumns="repeat(5, 1fr)"
              templateRows="repeat(4, 1fr)"
              gap={1}
            >
              {filteredCharacters.map((char, i) => (
                <Character
                  onClick={() => {
                    setCharacters([
                      ...characters.map((c) => {
                        if (c.name_id == char.name_id) {
                          c.selected = !c.selected;
                          return c;
                        } else {
                          return c;
                        }
                      }),
                    ]);
                  }}
                  key={i}
                  name={char.name}
                  name_id={char.name_id}
                  selected={char.selected}
                />
              ))}
            </Grid>
          </Flex>

          {/*---------------------------Teams --------------------------------------*/}

          <Flex gap={5}>
            <Box py="5px" borderWidth="1px" borderRadius="md" w="100%">
              <Flex alignItems="center" justify="center">
                <Text userSelect="none" mr="5px">
                  Teams
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Flex
            alignItems="center"
            justify="center"
            p="5px"
            borderWidth="1px"
            borderRadius="md"
            w="100%"
          >
            {filteredTeams.length > 0 ? (
              <Grid
                templateColumns="repeat(1, 1fr)"
                templateRows="repeat(1, 1fr)"
                gap={1}
              >
                {filteredTeams.map((t, i) => (
                  <Team
                    key={i}
                    characters={t.characters}
                    primaryCharacter={t.primaryCharacter}
                  />
                ))}
              </Grid>
            ) : (
              <Text color="gray.500" userSelect="none" mr="5px">
                No matching teams for selected characters
              </Text>
            )}
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}

export default App;
