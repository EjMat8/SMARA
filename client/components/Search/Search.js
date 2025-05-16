import { useRef, useContext, useEffect, useState } from "react";
import AppContext from "@/store";
import Dropdown from "./Dropdown";
import { toaster } from "@/components/ui/toaster";
import {
  Grid,
  GridItem as Gi,
  Field,
  Button,
  Input,
  Switch,
} from "@chakra-ui/react";
import { SpinnerDotted } from "spinners-react";
import categoriesList, {
  collection,
  limiters,
  installs,
  ratings,
} from "@/utils/categories";

export default function Search() {
  const {
    fetchAppResults,

    appResults,
    fetchAIInsights,
    insightStatus,
    appStatus,
    fetchDataSafety,
    dataSafetyStatus: { loading: dsLoading, error: dsError },
  } = useContext(AppContext);
  const inputRef = useRef();
  const categRef = useRef();
  const limitRef = useRef();
  const ratingRef = useRef();
  const installRef = useRef();
  const collectionRef = useRef();
  const [isCategory, setIsCategory] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputRef.current?.value && !categRef.current?.value)
      return toaster.create({
        description:
          "Please fill in at least the keyword or a category to get started.",
        type: "error",
      });
    const body = {
      keyword: !isCategory ? inputRef.current?.value || "" : "",
      category: isCategory
        ? categRef.current?.value
          ? categRef.current.value[0]
          : ""
        : "",
      limit: limitRef.current?.value ? limitRef.current.value[0] : 10,
      rating: ratingRef.current?.value ? ratingRef.current.value[0] : "",
      numInstall: installRef.current?.value ? installRef.current.value[0] : "",
      collection: isCategory
        ? collectionRef.current?.value
          ? collectionRef.current.value[0]
          : ""
        : "",
    };

    const appRes = await fetchAppResults(body);
    if (!appRes) {
      toaster.create({
        description: "Something went wrong while fetching the apps.",
        type: "error",
      });
      return;
    }
    if (appRes && appRes.length > 0) {
      const promise = fetchDataSafety(appRes.map((app) => app.appId));

      toaster.promise(promise, {
        loading: {
          title: "Fetching Data Safety...",
          description:
            "Please wait while we fetch data safety information in the background.",
        },
        success: {
          title: "Data Safety Fetched!",
          description:
            "Successfully fetched data safety information for all apps in the background.",
          duration: 3000,
        },
        error: {
          title: "Failed to Fetch Data Safety",
          description:
            "An error occurred while fetching data safety information.",
          duration: 4000,
        },
      });
    }
  };

  return (
    <Gi bgColor="white" colSpan={6} boxShadow="sm" p={4} borderRadius="lg">
      <Switch.Root
        mt={2}
        mb={4}
        checked={isCategory}
        onCheckedChange={({ checked }) => setIsCategory(checked)}
      >
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>
          {isCategory
            ? "Toggle me to search through keyword"
            : "Toggle me to search through categories"}
        </Switch.Label>
      </Switch.Root>
      <Grid
        templateColumns={"repeat(6,1fr)"}
        templateRows="repeat(2,1fr)"
        alignItems={"end"}
        gap="4"
      >
        {!isCategory ? (
          <Field.Root as={Gi} colSpan="5" w="100%">
            <Field.Label>Keyword</Field.Label>
            <Input placeholder="e.g. productivity, health" ref={inputRef} />
          </Field.Root>
        ) : (
          <>
            <Dropdown
              frameworks={categoriesList}
              placeholder={"all categories"}
              label={"Category"}
              ref={categRef}
              as={Gi}
              colSpan="3"
              w="100%"
            />
            <Dropdown
              frameworks={collection}
              placeholder={"all collections"}
              label={"Collections"}
              ref={collectionRef}
              as={Gi}
              colSpan="2"
              w="100%"
            />
          </>
        )}

        <Button
          as={Gi}
          colSpan="1"
          w="100%"
          onClick={handleSubmit}
          disabled={appStatus.loading}
        >
          {appStatus.loading ? <SpinnerDotted color="#fff" /> : "Search"}
        </Button>

        <Dropdown
          frameworks={ratings}
          placeholder={"any rating"}
          label={"Min Rating"}
          as={Gi}
          ref={ratingRef}
          colSpan="2"
          w="100%"
        />

        <Dropdown
          frameworks={installs}
          placeholder={"any number of installs"}
          label={"Min Installs"}
          as={Gi}
          ref={installRef}
          colSpan="2"
          w="100%"
        />

        <Dropdown
          frameworks={limiters}
          placeholder={"10"}
          label={"Limiter"}
          ref={limitRef}
          as={Gi}
          colSpan="2"
          w="100%"
        />
      </Grid>
    </Gi>
  );
}
