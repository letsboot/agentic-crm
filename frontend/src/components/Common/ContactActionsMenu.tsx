import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

import type { ContactPublic } from "@/client"
import DeleteContact from "../Contacts/DeleteContact"
import EditContact from "../Contacts/EditContact"

interface ContactActionsMenuProps {
  contact: ContactPublic
}

export const ContactActionsMenu = ({ contact }: ContactActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditContact contact={contact} />
        <DeleteContact id={contact.id} />
      </MenuContent>
    </MenuRoot>
  )
}
