"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { worldCities } from "@/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

// This is a simplified dataset. In a real-world application,
// you'd want to use a more comprehensive list of countries and cities.

interface WorldCitiesSelectProps {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}
export function WorldCitiesSelect({
  setLocation,
  setDestination,
}: WorldCitiesSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const allCities = useMemo(
    () =>
      worldCities.flatMap((country) =>
        country.cities.map((city) => ({
          value: `${city}, ${country.country}`,
          label: `${city}, ${country.country}`,
          country: country.country,
        }))
      ),
    []
  );

  const filteredCities = useMemo(
    
    () =>
      allCities
        .filter((city) =>
          city.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
        .slice(0, 100),
    [debouncedSearchTerm, allCities]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Enter city (e.g., London, UK or New York)..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Enter city (e.g., London, UK or New York, Mumbai)..."
            className="h-9"
            onValueChange={(value) => {
              setSearchTerm(value);
              setLocation(value);
            }}
          />
          <CommandList>
            <CommandEmpty>No city or country found.</CommandEmpty>
            {filteredCities.map((cityData, index) => (
              <CommandGroup
                key={`${cityData.country}-${cityData.value}-${index}`}
                heading={cityData.country}
              >
                <CommandItem
                  key={cityData.value}
                  value={cityData.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setLocation(currentValue);
                    setDestination(currentValue);
                  }}
                >
                  {cityData.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === cityData.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
