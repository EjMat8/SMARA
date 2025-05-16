import React from "react";
import { Box, Table, Text, VStack, Tag } from "@chakra-ui/react";
export default function AppDSTable({ appDS, isThirdParty }) {
  return (
    <Box mt={6} bg="white" borderRadius="lg">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {isThirdParty
          ? "Data Shared with Third Parties"
          : "Data Collected by This App"}
      </Text>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Data</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Purpose</Table.ColumnHeader>
            <Table.ColumnHeader>Required</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appDS[isThirdParty ? "sharedData" : "collectedData"].map(
            (item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.data}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>
                  <VStack align="flex-start" spacing={1}>
                    {item.purpose.split(",").map((purpose, idx) => (
                      <Tag.Root
                        key={idx}
                        size="sm"
                        variant="subtle"
                        colorPalette="gray"
                      >
                        <Tag.Label>{purpose}</Tag.Label>
                      </Tag.Root>
                    ))}
                  </VStack>
                </Table.Cell>
                <Table.Cell>
                  {!item.optional ? (
                    <Tag.Root size="sm" colorPalette="red">
                      <Tag.Label>Required</Tag.Label>
                    </Tag.Root>
                  ) : (
                    <Tag.Root size="sm" colorPalette="green">
                      <Tag.Label>Optional</Tag.Label>
                    </Tag.Root>
                  )}
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
