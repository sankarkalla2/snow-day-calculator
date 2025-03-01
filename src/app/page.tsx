import { UpgradeBannerDemo } from "@/components/banner";
import SnowDayCalculator from "@/components/snow-day-calculator";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const socialLinks = [
  { href: "https://x.com/sankarKalla3", label: "X", icon: <Twitter /> },
  {
    href: "https://www.linkedin.com/in/sankar-kalla/",
    label: "LinkedIn",
    icon: <Linkedin />,
  },
];

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/snow-day-calculator", label: "Snow Day Calculator" },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)] max-w-[100vw] overflow-hidden">
      <UpgradeBannerDemo />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <SnowDayCalculator />
        {/* <FeedbackForm /> */}
        <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24 overflow-hidden w-full">
          <div className="px-4 lg:px-8 max-w-screen-xl mx-auto">
            <div className="md:flex md:items-start md:justify-between">
              <Link
                href="/"
                className="flex items-center gap-x-2"
                aria-label="Snow Day Calculator"
              >
                <span className="font-bold text-xl">❄️</span>
              </Link>
              <ul className="flex list-none mt-6 md:mt-0 space-x-3">
                {socialLinks.map((link, i) => (
                  <li key={i}>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
              <nav className="lg:mt-0 lg:col-[4/11]">
                <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
                  {mainLinks.map((link, i) => (
                    <li key={i} className="my-1 mx-2 shrink-0">
                      <Link
                        href={link.href}
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 md:text-sm text-xs text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
                <div>
                  © {new Date().getFullYear()} Snow Day Calculator. Made with ❄️
                  by Sankar Kalla
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
