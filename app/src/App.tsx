import { useState } from "react";

import { FaGithub } from "react-icons/fa";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Tooltip,
  Image,
  Box,
  FormHelperText,
  Checkbox,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "@chakra-ui/react";
import Character from "./components/Character";

const DEFAULT_NUM_SIMULATIONS = 100000;

function App() {
  const [warps, setWarps] = useState(0);
  const [characterPity, setCharacterPity] = useState(0);
  const [conePity, setConePity] = useState(0);
  const [coneGuaranteed, setConeGuaranteed] = useState(false);
  const [characterGuaranteed, setCharacterGuaranteed] = useState(false);
  const [characterCopies, setCharacterCopies] = useState(0);
  const [coneCopies, setConeCopies] = useState(0);
  const [numSimulations, setNumSimulations] = useState(DEFAULT_NUM_SIMULATIONS);

  const [chance, setChance] = useState(-1);

  const [loading, setLoading] = useState(false);

  localStorage.setItem("chakra-ui-color-mode", "dark"); //set dark mode

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
        <a
          href="https://github.com/Jose-AE/hsr-warp-calculator"
          target="_blank"
        >
          <FaGithub />
        </a>
      </Box>

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          {/*---------------------------Character --------------------------------------*/}
          <Flex gap={5}>
            <Box py={"5px"} borderWidth="1px" borderRadius={"md"} w={"100%"}>
              <Flex alignItems="center" justify={"center"}>
                <Text userSelect={"none"} mr={"5px"}>
                  Owned Characters
                </Text>
                <Image
                  h={5}
                  w={5}
                  src="https://i.imgur.com/BHGnYJU.png"
                  alt="Char"
                />
              </Flex>
            </Box>
          </Flex>

          <Box py={"5px"} borderWidth="1px" borderRadius={"md"} w={"100%"}>
            <Character />
          </Box>

          {/*---------------------------Button --------------------------------------*/}

          <Stack spacing={6}>
            <Button
              isDisabled={
                !(
                  warps > 0 &&
                  characterPity >= 0 &&
                  conePity >= 0 &&
                  numSimulations > 0 &&
                  (characterCopies > 0 || coneCopies > 0)
                )
              }
              isLoading={loading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => {
                //console.log(`warps: ${warps} Waanted coe${coneCopies}`);
                setLoading(true);
              }}
            >
              Calculate
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default App;
