import { Box, Container, Heading, ListItem, UnorderedList, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/help")({
  component: Help,
})

function Help() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12} pb={4}>Help</Heading>
      <Text mb={4}>
        This application lets you manage contacts and users. Use the menu on the left to navigate between sections.
      </Text>
      <Heading size="md" mt={4} mb={2}>Key Features</Heading>
      <UnorderedList pl={4} mb={4}>
        <ListItem>Contact management with organisation and description fields.</ListItem>
        <ListItem>User authentication and authorization with JWT.</ListItem>
        <ListItem>Responsive UI with dark mode support.</ListItem>
      </UnorderedList>
      <Heading size="md" mt={4} mb={2}>Getting Started</Heading>
      <UnorderedList pl={4}>
        <ListItem>Log in with your credentials or sign up for a new account.</ListItem>
        <ListItem>Add new contacts from the Contacts page.</ListItem>
        <ListItem>Update your profile in User Settings.</ListItem>
      </UnorderedList>
    </Container>
  )
}

export default Help
