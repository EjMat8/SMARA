import { Box, Flex, Icon, Text,VStack } from "@chakra-ui/react";
import { FiLock } from "react-icons/fi";
export default function AppPermissions({ app }) {
  return (
    <Box p={6} bg="white">
      <Text fontSize="sm" color="gray.500" mb={4}>
        This app requires the following permissions:
      </Text>
      <VStack gap={4} align="stretch">
        {app.permissions.map((permission, index) => (
          <Flex
            key={index}
            p={4}
            bg="white"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            align="center"
          >
            <Icon as={FiLock} color="orange.400" boxSize={5} mr={4} />
            <Box>
              <Text fontWeight="bold" fontSize="md">
                {permission.type}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {permission.permission}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
