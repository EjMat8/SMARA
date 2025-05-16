import { NumberInput } from "@chakra-ui/react";

import React from "react";

export default function NumInput({ ref }) {
  return (
    <NumberInput.Root
      ref={ref}
      onValueChange={(e) => {
        ref.current.value = e.value;
      }}
    >
      <NumberInput.Label />

      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
      <NumberInput.Scrubber />
      <NumberInput.Input />
    </NumberInput.Root>
  );
}
