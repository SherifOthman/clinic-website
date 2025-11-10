"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";

import { logoutAction } from "@/src/features/auth";
import type { User } from "@/src/types";

interface UserMenuProps {
  user: User | null;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const handleLogout = async () => {
    await logoutAction();
  };

  if (user) {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            {...(user.avatar && { src: user.avatar })}
            name={`${user.firstName} ${user.lastName}`}
            className="h-10 w-10 cursor-pointer transition-transform hover:scale-105"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User menu">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="Profile"
          >
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-default-500 text-sm">{user.email}</p>
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            startContent={<UserIcon className="h-4 w-4" />}
            as={Link}
            href="/dashboard"
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="profile-page"
            startContent={<UserIcon className="h-4 w-4" />}
            as={Link}
            href="/profile"
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<Settings className="h-4 w-4" />}
            as={Link}
            href="/settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<LogOut className="h-4 w-4" />}
            onPress={handleLogout}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <>
      <Button
        as={Link}
        href="/login"
        variant="light"
        className="hidden lg:flex"
      >
        Login
      </Button>
      <Button as={Link} href="/signup" color="primary" size="sm">
        Get Started
      </Button>
    </>
  );
};
