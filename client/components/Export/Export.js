"use client";
import {
  GridItem,
  Heading,
  Text,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";

import { Toaster, toaster } from "@/components/ui/toaster";
import Dropdown from "../Search/Dropdown";
import DataFields from "./DataFields";
import { format } from "@/utils/categories";
import { useRef, useState, useContext, useCallback } from "react";

import AppContext from "@/store";

const fieldMap = {
  title: (app) => app.title,
  developer: (app) => app.developer,
  categories: (app) => app.categories?.[0]?.name || "N/A",
  ratings: (app) => app.ratings,
  scoreText: (app) => app.scoreText,
  maxInstalls: (app) => app.maxInstalls,
  priceText: (app) => `${app.priceText}${app.offersIAP ? " / IAP" : ""}`,
  permissions: (app) =>
    app.permissions.length
      ? `Number of permissions: ${app.permissions.length}; ${app.permissions
          ?.map((p) => `(${p.type}) ${p.permission}`)
          .join("; ")}`
      : "None",
};

export default function Export() {
  const formatRef = useRef();
  const [fields, setFields] = useState([]);
  const { appResults, dataSafetyResults } = useContext(AppContext);
  const generateCSV = useCallback(
    (apps, selectedFields, fieldMap, dataSafetyMap) => {
      const header = selectedFields.join(",");

      const rows = apps.map((app) => {
        return selectedFields
          .map((field) => {
            if (field === "datasafety") {
              const dataSafety = dataSafetyMap.get(app.appId);
              return `"${
                dataSafety
                  ? JSON.stringify(dataSafety).replace(/"/g, '""')
                  : "N/A"
              }"`;
            }
            const value = fieldMap[field] ? fieldMap[field](app) : "N/A";
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",");
      });

      return [header, ...rows].join("\n");
    },
    []
  );
  const downloadCSV = useCallback(
    (csvContent, filename = "smar_export.csv") => {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.click();
    },
    []
  );
  const downloadFilteredJSON = useCallback(
    (apps, selectedFields, dataSafetyMap, filename = "smar_export.json") => {
      const filteredData = apps.map((app) => {
        const entry = {};
        selectedFields.forEach((field) => {
          if (field === "datasafety")
            entry[field] = dataSafetyMap.get(app.appId) || null;
          else entry[field] = app[field];
        });
        return entry;
      });

      const jsonStr = JSON.stringify(filteredData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const { value: formatVal } = formatRef.current;
    const selectedFields = fields;

    if (!appResults.length) {
      toaster.create({
        description: "No data to export. You need to search for apps first.",
        type: "error",
      });
      return;
    }
    if (!formatVal || !selectedFields.length) {
      toaster.create({
        description: "Please make sure you have format and fields selected",
        type: "error",
      });
      return;
    }
    if (formatVal[0] === "csv")
      downloadCSV(generateCSV(appResults, fields, fieldMap, dataSafetyResults));
    else if (formatVal[0] === "json")
      downloadFilteredJSON(appResults, fields, dataSafetyResults);
  };

  return (
    <>
      <GridItem
        bg="white"
        gridColumn="1 / -1"
        borderRadius={"lg"}
        p={4}
        boxShadow="md"
        pos="relative"
      >
        <Heading>Export Data</Heading>
        <Text mb={3} fontSize={"sm"} color={"gray.600"}>
          Export app data for analysis or reporting
        </Text>
        <HStack gap={5}>
          <Dropdown
            frameworks={format}
            label="Format"
            placeholder="select format"
            ref={formatRef}
          />
          <DataFields fields={fields} setFields={setFields} />
        </HStack>
        <Flex justifyContent={"flex-end"} mt={4}>
          <Button onClick={handleSubmit}>Export</Button>
        </Flex>
      </GridItem>
    </>
  );
}
