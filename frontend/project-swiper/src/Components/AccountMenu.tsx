import * as React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { NavbarLinks } from "../Helpers/NavbarLinks";

export default function AccountMenu(props: any) {
  const { initials } = props;
  return (
    <IconButton
      onClick={() => {
        window.location.pathname = NavbarLinks["myprofile"].redirect;
      }}
      size="small"
      sx={{ ml: 2 }}
    >
      <Avatar sx={{ height: "40px", width: "40px", margin: "5px 5px 5px 5px" }}>{initials}</Avatar>
    </IconButton>
  );
}
