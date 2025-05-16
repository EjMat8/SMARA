import {
  GridItem,
  Heading,
  Text,
  Box,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import AppContext from "@/store";
import AppPagination from "../ui/AppPagination";
import { SpinnerDotted } from "spinners-react";
export default function Insights() {
  const {
    dataSafetyStatus: { loading: dsLoading },
    appStatus: { loading: appLoading },
    insightStatus: { loading: insightLoading },
    appResults,
    dataSafetyResults,
    fetchAIInsights,
  } = useContext(AppContext);
  const [insight, setInsight] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paginatedResults = appResults.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const onAnalyzeClick = async (app) => {
    const appId = app.appId;
    const dataSafety = dataSafetyResults.get(appId);
    const appObj = {
      title: app.title,
      developer: app.developer,
      score: app.scoreText,
      installs: app.maxInstalls,
      ratings: app.ratings,
      free: app.free,
      price: app.priceText,
      offersIAP: app.offersIAP,
      IAPRange: app?.IAPRange || "N/A",
      permissions: app.permissions,
      contentRating: app.contentRating,
      categories: app.categories,
      dataShared: dataSafety.sharedData,
      dataCollected: dataSafety.collectedData,
      securityPractices: dataSafety.securityPractices,
      privacyPolicyUrl: dataSafety.privacyPolicyUrl,
    };
    const { summary } = await fetchAIInsights({ app: appObj });
    setInsight({
      summary,
      title: app.title,
      developer: app.developer,
      icon: app.icon,
    });
  };
  return (
    <GridItem
      bg="white"
      colSpan={2}
      rowSpan={2}
      boxShadow="md"
      borderRadius="lg"
      p={4}
      display={"flex"}
      flexDir="column"
    >
      <Heading mb={4}>AI Summary</Heading>
      {appLoading || dsLoading || insightLoading ? (
        <Flex alignItems="center" gap={2} justifyContent={"center"} flex="1">
          <SpinnerDotted color="#000" />{" "}
          {appLoading
            ? "Fetching Apps"
            : dsLoading
            ? "Fetching Data Safety"
            : insightLoading
            ? "Analyzing App"
            : ""}
        </Flex>
      ) : insight ? (
        <Box>
          <Flex alignItems="center" gap={3} mb={4}>
            <Image
              src={insight.icon}
              alt={"app icon"}
              boxSize="40px"
              borderRadius="md"
              fallbackSrc="https://via.placeholder.com/40"
            />
            <Box flex="1">
              <Text fontWeight="medium" noOfLines={1}>
                {insight.title}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {insight.developer}
              </Text>
            </Box>
          </Flex>
          <Text lineHeight={1.8} mb="4">
            {insight.summary}
          </Text>
          <Button variant="subtle" onClick={() => setInsight(null)}>
            Back
          </Button>
        </Box>
      ) : (
        <Flex flexDir="column" flex="1" gap="5">
          <Flex flexDir="column" gap="5" height="100%">
            {paginatedResults.map((app, index) => (
              <Flex alignItems="center" gap={3} key={index}>
                <Image
                  src={app.icon}
                  alt={"app icon"}
                  boxSize="40px"
                  borderRadius="md"
                  fallbackSrc="https://via.placeholder.com/40"
                />
                <Box flex="1">
                  <Text fontWeight="medium" noOfLines={1}>
                    {app.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {app.developer}
                  </Text>
                </Box>
                <Button onClick={() => onAnalyzeClick(app)}>Analyze</Button>
              </Flex>
            ))}
          </Flex>
          <AppPagination
            pageSize={pageSize}
            setPage={setPage}
            appResults={appResults}
          />
        </Flex>
      )}
    </GridItem>
  );
}
