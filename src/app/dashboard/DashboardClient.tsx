"use client";

import { Button } from "@heroui/button";
import { ExternalLink, LogOut } from "lucide-react";

import { logoutAction } from "@/src/features/auth";

export function DashboardClient() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="flex gap-2">
      <Button color="primary" size="lg" className="font-semibold shadow-lg">
        <ExternalLink className="mr-2 h-5 w-5" />
        Open Management Dashboard
      </Button>
      <Button
        variant="bordered"
        size="lg"
        onPress={handleLogout}
        className="font-semibold"
      >
        <LogOut className="mr-2 h-5 w-5" />
        Logout
      </Button>
    </div>
  );
}
