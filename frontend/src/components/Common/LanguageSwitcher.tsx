import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="outline" size="sm">
        {i18n.language.toUpperCase()}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage("en")}>{t("language.english")}</MenuItem>
        <MenuItem onClick={() => changeLanguage("de")}>{t("language.german")}</MenuItem>
        <MenuItem onClick={() => changeLanguage("ja")}>{t("language.japanese")}</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default LanguageSwitcher;
