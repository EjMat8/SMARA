import {
  Box,
  Flex,
  Grid,
  GridItem,
  Separator,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function AppOverview({ app }) {
  return (
    <Box p={6} bg="white">
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
        <GridItem>
          <Text fontSize="sm" color="gray.500">
            Version
          </Text>
          <Text fontWeight="bold">{app.version}</Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" color="gray.500">
            Released
          </Text>
          <Text fontWeight="bold">{app.released}</Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" color="gray.500">
            Last Updated
          </Text>
          <Text fontWeight="bold">
            {new Date(app.updated).toISOString().split("T")[0]}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" color="gray.500">
            Content Rating
          </Text>
          <Text fontWeight="bold">{app.contentRating}</Text>
        </GridItem>
      </Grid>
      <Separator mb={6} />
      <Box mb={6}>
        <Heading as="h3" size="sm" mb={2}>
          Description
        </Heading>
        <Text fontSize="sm" color="gray.700">
          {app.description}
        </Text>
      </Box>
      <Separator mb={6} />
      <Box>
        <Heading as="h3" size="sm" mb={2}>
          Screenshots
        </Heading>
        <Flex gap={4} overflow="auto">
          {app.screenshots.slice(0, 6).map((screenshot, index) => (
            <Image
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              boxSize="300px"
              borderRadius="md"
              fit="contain"
              fallbackSrc="https://via.placeholder.com/100"
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
