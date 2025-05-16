import {
  Button,
  Menu,
  Portal,
  Checkbox,
  Select,
  Flex,
  CheckboxGroup,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "@/store";
import { dataFields } from "@/utils/categories";
import Field from "./Field";
export default ({ fields, setFields, props }) => {
  const {
    dataSafetyStatus: { loading: dsLoading },
    dataSafetyResults,
  } = useContext(AppContext);

  return (
    <Select.Root {...props}>
      <Select.HiddenSelect />
      <Select.Label>Data Fields</Select.Label>
      <Select.Control>
        <Select.Trigger>
          {fields.length ? (
            <Text color="black">{fields.length} Fields Selected</Text>
          ) : (
            <Text>select fields to export</Text>
          )}
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <CheckboxGroup
              as={Flex}
              flexDir="column"
              gap={2}
              p="5px 10px"
              value={fields}
              onValueChange={(e) => {
                setFields(e);
              }}
            >
              {dataFields.items.map((field) => (
                <Field
                  key={field.value}
                  fieldValue={field.value}
                  fieldName={field.label}
                />
              ))}
              <Field
                key={"datasafety"}
                fieldValue={"datasafety"}
                fieldName={"Data Safety"}
                disabled={!dataSafetyResults.size}
                loading={dsLoading}
                hasLoader={true}
              />
            </CheckboxGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
