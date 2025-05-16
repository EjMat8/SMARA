import { Checkbox } from "@chakra-ui/react";
import { SpinnerDotted } from "spinners-react";
export default function Field({
  fieldName,
  fieldValue,
  disabled = false,
  hasLoader = false,
  loading = false,
}) {
  return (
    <Checkbox.Root key={fieldValue} value={fieldValue} disabled={disabled}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label display="flex" gap={2}>
        {fieldName}
        {hasLoader && loading && <SpinnerDotted size={20} color="#000" />}
      </Checkbox.Label>
    </Checkbox.Root>
  );
}
