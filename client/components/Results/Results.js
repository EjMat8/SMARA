import {
  GridItem,
  HStack,
  Text,
  Grid,
  Box,
  Flex,
  Icon,
  Button,
  Heading,
  VStack,
  ButtonGroup,
  IconButton,
  Pagination,
  Center,
} from "@chakra-ui/react";
import ResultsItem from "./ResultsItem";
import { FiFilter, FiArrowUpDown } from "react-icons/fi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { useContext, useState } from "react";
import AppContext from "@/store";
import { SpinnerDotted } from "spinners-react";
import AppPagination from "../ui/AppPagination";

export default function Results() {
  const {
    appResults,
    appStatus: { loading },
  } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paginatedResults = appResults.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  return (
    <GridItem
      bgColor="white"
      colSpan={4}
      rowSpan={2}
      p={4}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      minH="40rem"
      display="flex"
      flexDirection="column"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Heading size="md">Search Results</Heading>
          <Text color="gray.500" fontSize="sm">
            {loading
              ? "Looking for relevant apps..."
              : !!appResults.length
              ? `Found ${appResults.length} apps matching your criteria`
              : "No apps found matching your criteria"}
          </Text>
        </Box>
      </Flex>

      <Grid
        templateColumns="2fr 1fr 1fr 1fr 1fr"
        gap={4}
        py={3}
        px={2}
        bg="gray.50"
        borderRadius="md"
        mb={2}
        fontWeight="medium"
      >
        <GridItem>App</GridItem>
        <GridItem>Rating</GridItem>
        <GridItem>Installs</GridItem>
        <GridItem>Price</GridItem>
        <GridItem>Permissions</GridItem>
      </Grid>

      {loading ? (
        <Center h="70%">
          <SpinnerDotted color="#000" />
        </Center>
      ) : (
        <VStack spacing={2} align="stretch">
          {paginatedResults.map((app) => (
            <ResultsItem key={app.appId} id={app.appId} app={app} />
          ))}
        </VStack>
      )}
      <AppPagination
        pageSize={pageSize}
        setPage={setPage}
        appResults={appResults}
      />
    </GridItem>
  );
}
