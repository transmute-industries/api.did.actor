import * as React from "react";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import ListSubheader from "@mui/material/ListSubheader";
import CodeIcon from "@mui/icons-material/Code";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import SearchIcon from "@mui/icons-material/Search";
import ApiIcon from "@mui/icons-material/Api";
import BiotechIcon from "@mui/icons-material/Biotech";
import { useRouter } from "next/router";
import CreateIcon from "@mui/icons-material/Create";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import ContactMailIcon from "@mui/icons-material/ContactMail";
export const Drawer = () => {
  const router = useRouter();

  return (
    <div>
      <Toolbar />
      <Divider />
      <List
        subheader={<ListSubheader component="div">Identifiers</ListSubheader>}
      >
        <ListItem
          button
          selected={router.pathname === "/"}
          onClick={() => {
            router.push("/");
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Create"} />
        </ListItem>
        <ListItem
          button
          selected={
            router.pathname === "/resolve" ||
            router.pathname.startsWith("/[did]")
          }
          onClick={() => {
            router.push("/resolve");
          }}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Resolve"} />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader component="div">Credentials</ListSubheader>}
      >
        <ListItem
          button
          selected={router.pathname === "/issue"}
          onClick={() => {
            router.push("/issue");
          }}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={"Create"} />
        </ListItem>
        <ListItem
          button
          selected={router.pathname === "/credentials/verify"}
          onClick={() => {
            router.push("/credentials/verify");
          }}
        >
          <ListItemIcon>
            <BiotechIcon />
          </ListItemIcon>
          <ListItemText primary={"Verify"} />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader component="div">Presentations</ListSubheader>}
      >
        <ListItem
          button
          selected={router.pathname === "/present"}
          onClick={() => {
            router.push("/present");
          }}
        >
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary={"Create"} />
        </ListItem>
        <ListItem
          button
          selected={router.pathname === "/presentations/verify"}
          onClick={() => {
            router.push("/presentations/verify");
          }}
        >
          <ListItemIcon>
            <BiotechIcon />
          </ListItemIcon>
          <ListItemText primary={"Verify"} />
        </ListItem>
      </List>

      <List subheader={<ListSubheader component="div">Ciphers</ListSubheader>}>
        <ListItem
          button
          selected={router.pathname === "/encrypt"}
          onClick={() => {
            router.push("/encrypt");
          }}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary={"Encrypt"} />
        </ListItem>
        <ListItem
          button
          selected={router.pathname === "/decrypt"}
          onClick={() => {
            router.push("/decrypt");
          }}
        >
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary={"Decrypt"} />
        </ListItem>
      </List>
      <Divider />
      <Divider />
      <List>
        <ListItem
          button
          selected={router.pathname === "/about"}
          onClick={() => {
            router.push("/about");
          }}
        >
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"About"} />
        </ListItem>
        <ListItem
          button
          component={Link}
          href="https://github.com/transmute-industries/api.did.actor"
        >
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary={"Source"} />
        </ListItem>
        <ListItem button component={Link} href="/docs">
          <ListItemIcon>
            <ApiIcon />
          </ListItemIcon>
          <ListItemText primary={"API"} />
        </ListItem>
      </List>
    </div>
  );
};
