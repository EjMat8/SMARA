import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Text,
  Flex,
  Tabs,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FiLock, FiEye, FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import AppTitle from "./AppTitle";
import AppOverview from "./AppOverview";
import AppPermissions from "./AppPermissions";
import AppDataSafety from "./AppDataSafety";

const AppDetails = ({ app }) => {
  return (
    <Dialog.Root size="xl">
      <Dialog.Trigger asChild>
        <Button size="sm" variant="ghost" p={1}>
          <Tooltip content="View App Details">
            <Icon as={FiEye} />
          </Tooltip>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                <AppTitle app={app} />
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Tabs.Root defaultValue="overview" variant="plain" size="sm">
                <Tabs.List
                  bg="bg.muted"
                  rounded="l3"
                  p="1"
                  w="100%"
                  display="flex"
                >
                  <Tabs.Trigger
                    value="overview"
                    flex="1"
                    justifyContent="center"
                  >
                    Overview
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="permissions"
                    flex="1"
                    justifyContent="center"
                  >
                    Permissions
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="datasafety"
                    flex="1"
                    justifyContent="center"
                  >
                    Data Safety
                  </Tabs.Trigger>

                  <Tabs.Indicator
                    rounded="l2"
                    flex="1"
                    justifyContent="center"
                  />
                </Tabs.List>
                <Tabs.Content value="overview">
                  <AppOverview app={app} />
                </Tabs.Content>
                <Tabs.Content value="permissions">
                  <AppPermissions app={app} />
                </Tabs.Content>
                <Tabs.Content value="datasafety">
                  <AppDataSafety app={app} />
                </Tabs.Content>
              </Tabs.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default AppDetails;
