"use client";

import * as React from "react";
import { Sun, Flower2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/useMounted";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = useMounted();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}
    >
      {mounted && (theme === Theme.DARK ? <Sun /> : <Flower2 />)}
      {!mounted && <div className="size-3.5" />}
    </Button>
  );
}
