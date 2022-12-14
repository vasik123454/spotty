"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";

import { HiOutlineLocationMarker, HiOutlineCog } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";

import { UserMenuBody } from "../components/UserMenu/UserMenuBody/UserMenuBody";
import { UserMenuButton } from "../components/UserMenu/UserMenuButton";
import { UserMenuIcon } from "../components/UserMenu/UserMenuIcon";
import { useSession } from "../hooks/useSession";

const NavbarUser = () => {
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { data: user, signOut } = useSession();

  if (!user) return null;

  return (
    <>
      <UserMenuIcon
        opened={opened}
        onClick={() => {
          setOpened(!opened);
          setClicked(true);
        }}
        url={user.avatarUrl}
      />
      <UserMenuBody opened={opened} clicked={clicked}>
        <UserMenuButton Icon={RiUserLine} top>
          {user.name === "" || user.name === null
            ? user.email.split("@")[0]
            : user.name}
        </UserMenuButton>
        <UserMenuButton Icon={HiOutlineLocationMarker}>
          My places
        </UserMenuButton>
        <UserMenuButton Icon={HiOutlineCog}>Settings</UserMenuButton>
        <UserMenuButton
          onClick={async () => {
            await signOut();
          }}
          Icon={VscSignOut}
          bottom
        >
          Sign Out
        </UserMenuButton>
      </UserMenuBody>
    </>
  );
};

export default NavbarUser;
