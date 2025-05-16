import {
  Grid,
  GridItem,
  Flex,
  Image,
  Box,
  Text,
  Icon,
  Badge,
  Button,
} from "@chakra-ui/react";
import { FiStar, FiUsers, FiLock, FiEye } from "react-icons/fi";

import AppDetails from "../Details/AppDetails";
function formatNumber(value) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B+`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K+`;
  } else {
    return `${value}+`;
  }
}
export default function ResultsItem({ app, id }) {
  return (
    <Grid
      key={id}
      templateColumns="2fr 1fr 1fr 1fr 1fr"
      gap={4}
      py={3}
      px={2}
      borderRadius="md"
      _hover={{ bg: "gray.50" }}
      transition="background 0.2s"
      alignItems="center"
    >
      <GridItem>
        <Flex alignItems="center" gap={3}>
          <Image
            src={app.icon}
            alt={app.title}
            boxSize="40px"
            borderRadius="md"
            fallbackSrc="https://via.placeholder.com/40"
          />
          <Box>
            <Text fontWeight="medium" noOfLines={1}>
              {app.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {app.developer}
            </Text>
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex alignItems="center">
          <Icon as={FiStar} color="yellow.400" mr={1} />
          <Text>{app.scoreText}</Text>
        </Flex>
      </GridItem>

      <GridItem>
        <Flex alignItems="center">
          <Icon as={FiUsers} color="gray.500" mr={1} />
          <Text>{formatNumber(app.minInstalls)}</Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Text>
          {app.priceText}
          {app.offersIAP && " / IAP"}
        </Text>
      </GridItem>
      <GridItem>
        <Flex alignItems="center" justifyContent="space-between">
          <Badge
            colorPalette={app.permissions.length > 10 ? "orange" : "green"}
            display="flex"
            alignItems="center"
            variant="solid"
          >
            <Icon as={FiLock} boxSize={3} mr={1} />
            {app.permissions.length}
          </Badge>

          <AppDetails
            app={{ installText: formatNumber(app.minInstalls), ...app }}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
}
