import { Flex, Image, Box, Text, Tag, Icon } from "@chakra-ui/react";
import { FiStar, FiUsers } from "react-icons/fi";
export default function AppTitle({ app }) {
  return (
    <Flex gap={5}>
      <Image
        src={app.icon}
        alt={"app image"}
        boxSize="60px"
        borderRadius="md"
        fallbackSrc="https://via.placeholder.com/40"
      />
      <Box pt="1">
        <Text lineHeight="0.7" fontSize="2xl" fontWeight={"bold"}>
          {app.title}
        </Text>
        <Text fontSize="xs" color="gray.500" mb={1}>
          {app.developer}
        </Text>
        <Flex gap={2}>
          <Tag.Root variant="outline" borderRadius="xl" px={2}>
            <Tag.Label>{app.categories[0].name}</Tag.Label>
          </Tag.Root>
          <Tag.Root variant="outline" borderRadius="xl" px={2}>
            <Tag.Label>
              <Icon as={FiStar} /> {app.scoreText}
            </Tag.Label>
          </Tag.Root>
          <Tag.Root variant="outline" borderRadius="xl" px={2}>
            <Tag.Label>
              <Icon as={FiUsers} /> {app.installText}
            </Tag.Label>
          </Tag.Root>
        </Flex>
      </Box>
    </Flex>
  );
}
