import {
  Container,
  EmptyState,
  Flex,
  Heading,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { ContactsService } from "@/client"
import { ContactActionsMenu } from "@/components/Common/ContactActionsMenu"
import AddContact from "@/components/Contacts/AddContact"
import PendingItems from "@/components/Pending/PendingItems"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"

const contactsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getContactsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ContactsService.readContacts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["contacts", { page }],
  }
}

export const Route = createFileRoute("/_layout/contacts")({
  component: Contacts,
  validateSearch: (search) => contactsSearchSchema.parse(search),
})

function ContactsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getContactsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: string }) => ({ ...prev, page }),
    })

  const contacts = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  if (isLoading) {
    return <PendingItems />
  }

  if (contacts.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any contacts yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new contact to get started
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="30%">ID</Table.ColumnHeader>
            <Table.ColumnHeader w="30%">Organisation</Table.ColumnHeader>
            <Table.ColumnHeader w="30%">Description</Table.ColumnHeader>
            <Table.ColumnHeader w="10%">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts?.map((contact) => (
            <Table.Row key={contact.id} opacity={isPlaceholderData ? 0.5 : 1}>
              <Table.Cell truncate maxW="30%">
                {contact.id}
              </Table.Cell>
              <Table.Cell truncate maxW="30%">
                {contact.organisation}
              </Table.Cell>
              <Table.Cell
                color={!contact.description ? "gray" : "inherit"}
                truncate
                maxW="30%"
              >
                {contact.description || "N/A"}
              </Table.Cell>
              <Table.Cell width="10%">
                <ContactActionsMenu contact={contact} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justifyContent="flex-end" mt={4}>
        <PaginationRoot
          count={count}
          pageSize={PER_PAGE}
          onPageChange={({ page }) => setPage(page)}
        >
          <Flex>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Flex>
        </PaginationRoot>
      </Flex>
    </>
  )
}

function Contacts() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Contacts Management
      </Heading>
      <AddContact />
      <ContactsTable />
    </Container>
  )
}
