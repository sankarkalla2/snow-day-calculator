"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-x-4 px-4 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold flex items-center">
            ❄️ SnowDayCalculator
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4 sm:justify-between">
          <nav className="hidden sm:flex items-center space-x-6 text-sm">
            <Link
              href="/custom-snow-calculator"
              className="transition hover:text-foreground/80"
            >
              CustomSnowCalculator
            </Link>
            <Link href="/about" className="transition hover:text-foreground/80">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button asChild className="hidden sm:flex px-4">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-background border-t border-border/50">
            <Link href="/custom-snow-calculator">CustomSnowCalculator</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
