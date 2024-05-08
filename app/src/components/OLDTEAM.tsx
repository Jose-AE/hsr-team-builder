// import { Box, Flex, Text, Image } from "@chakra-ui/react";
// import { ITeamData } from "../data/teams.data";

// function Character({ name_id }: { name_id: string }) {
//   return (
//     <Box borderWidth={"1px"} m={"3px"} bg={"gray.900"} borderRadius={"3px"}>
//       <Image
//         borderRadius={"3px"}
//         objectFit={"cover"}
//         height={"55px"}
//         width={"55px"}
//         pointerEvents={"none"}
//         src={
//           new URL(`../assets/characters/${name_id}.webp`, import.meta.url).href
//         }
//       />
//     </Box>
//   );
// }

// export default function Team({ characters, primaryCharacter }: ITeamData) {
//   return (
//     <Box
//       h={"70px"}
//       width={"256px"}
//       userSelect={"none"}
//       borderRadius="5px"
//       bg="gray.800"
//       p={"5px"}
//     >
//       <Flex gap={1}>
//         <Character name_id={characters[0].name_id} />
//         <Character name_id={characters[1].name_id} />
//         <Character name_id={characters[2].name_id} />
//         <Character name_id={characters[3].name_id} />
//       </Flex>
//     </Box>
//   );
// }
