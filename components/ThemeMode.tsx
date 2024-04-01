"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [on, setOn] = React.useState(false);

  function switchState() {
    if (on) setTheme("light");
    else setTheme("dark");
    setOn(!on);
  }

  return (
    <div className="flex justify-between items-center w-32">
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Switch checked={on} onCheckedChange={switchState} />
    </div>
  );
}
