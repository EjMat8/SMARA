import { Select, Portal } from "@chakra-ui/react";
import { useState } from "react";
export default function Dropdown({
  frameworks,
  placeholder,
  label,
  ref,
  ...props
}) {
  return (
    <Select.Root
      collection={frameworks}
      {...props}
      onValueChange={(e) => {
        ref.current.value = e.value;
      }}
    >
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content ref={ref}>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
