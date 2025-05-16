import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Icon,
  VStack,
  Table,
  Tag,
} from "@chakra-ui/react";
import { FiLock, FiCheckCircle, FiInfo } from "react-icons/fi";
import AppContext from "@/store";
import { useContext } from "react";
import AppDSTable from "./AppDSTable";
import { SpinnerDotted } from "spinners-react";

function generateDataCollectionSummary(data) {
  const { collectedData: dataCollected } = data;

  // Total number of data types collected
  const totalDataTypes = dataCollected.length;

  // Count of required data types
  const requiredDataTypes = dataCollected.filter(
    (item) => !item.optional
  ).length;

  // Extract unique sensitive data types (e.g., "Personal info", "Financial info")
  const sensitiveDataTypes = [
    ...new Set(dataCollected.map((item) => item.type.toUpperCase())),
  ];

  // Generate the summary
  return `This app collects ${totalDataTypes} types of data, of which ${requiredDataTypes} are required. Data types collected are ${sensitiveDataTypes.join(
    " and "
  )}.`;
}
export default function AppDataSafety({ app }) {
  const {
    dataSafetyResults,
    dataSafetyStatus: { loading: dsLoading },
  } = useContext(AppContext);
  const { appId } = app;
  const appDS = dataSafetyResults.get(appId);

  if (dsLoading)
    return (
      <Flex alignItems={"center"} gap={4} justifyContent={"center"} mt="3rem">
        <SpinnerDotted color="#000" />
        Fetching Data Safety
      </Flex>
    );
  return (
    <>
      <Box p={6} bg="white" borderRadius="lg">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h3" size="md">
            Data Safety
          </Heading>
          <Link
            href={appDS?.privacyPolicyUrl}
            color="blue.500"
            fontSize="sm"
            isExternal
          >
            Privacy Policy
          </Link>
        </Flex>
        <Text fontSize="sm" color="gray.600" mb={6}>
          This information was provided by the developer and shows how the app
          collects and shares your data.
        </Text>

        <Heading as="h4" size="sm" mb={4}>
          Security Practices
        </Heading>
        <Flex gap={4} flexWrap="wrap">
          {appDS.securityPractices.map((practice, index) => (
            <Flex
              key={index}
              p={4}
              borderRadius="md"
              flex="1 1 35%"
              minW="250px"
              align="flex-start"
              border="1px solid"
              borderColor="gray.200"
            >
              <Icon
                as={index === 0 ? FiLock : FiCheckCircle}
                boxSize={6}
                color={
                  /^(?!.*\b\w+[’']t\b).*$/.test(practice.practice)
                    ? "green.500"
                    : "red.500"
                }
                mr={4}
              />
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  {practice.practice}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {practice.description}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
        <AppDSTable appDS={appDS} isThirdParty={true} />
        <AppDSTable appDS={appDS} isThirdParty={false} />
        <Box mt={6} p={4} bg="gray.100" borderRadius="md">
          <Flex align="center" mb={2}>
            <Icon as={FiInfo} boxSize={5} color="gray.600" mr={2} />
            <Text fontWeight="bold" fontSize="md">
              Data Collection Summary
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.600" lineHeight={1.8}>
            {generateDataCollectionSummary(appDS)}
          </Text>
        </Box>
      </Box>
    </>
  );
}
