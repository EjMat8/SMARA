import { HStack, Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function AppPagination({ appResults, pageSize, setPage }) {
  return (
    <HStack justifyContent="center" alignItems="end" flex={1}>
      {!!appResults.length && (
        <Pagination.Root
          count={appResults.length}
          pageSize={pageSize}
          defaultPage={1}
          onPageChange={(details) => setPage(details.page)}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </HStack>
  );
}
