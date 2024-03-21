import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/GameHub Resources/Logo/logo.webp";
import { px } from "framer-motion";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Image src={logo} boxSize="60px" />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
