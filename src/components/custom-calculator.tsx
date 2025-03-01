"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CustomWeatherData {
  temp_c: number;
  humidity: number;
  precip_mm: number;
  condition: string;
}

const CustomerSnowCalculator = () => {
  const [customWeather, setCustomWeather] = useState<CustomWeatherData>({
    temp_c: -2,
    humidity: 85,
    precip_mm: 1,
    condition: "clear",
  });
  const [snowProbability, setSnowProbability] = useState<{
    probability: number;
    reason: string;
  } | null>(null);

  const calculateSnowProbability = (data: CustomWeatherData) => {
    let probability = 0;
    let reason = "";

    // Check if it's already snowing
    if (
      data.condition.includes("snow") ||
      data.condition.includes("blizzard")
    ) {
      probability = 100;
      reason = "It's currently snowing";
      return { probability, reason };
    }

    // Temperature is the primary factor
    if (data.temp_c > 3) {
      probability = 0;
      reason = "Temperature is too high for snow";
    } else if (data.temp_c <= 3 && data.temp_c > 0) {
      probability = 25;
      reason = "Temperature is near freezing point";
    } else if (data.temp_c <= 0 && data.temp_c > -15) {
      probability = 50;
      reason = "Temperature is ideal for snow";
    } else {
      probability = 30;
      reason = "Temperature is very cold";
    }

    // Humidity is crucial for snow formation
    if (data.humidity > 90 && probability > 0) {
      probability += 30;
      reason += " with very high humidity";
    } else if (data.humidity > 70 && probability > 0) {
      probability += 20;
      reason += " with high humidity";
    } else if (data.humidity < 40 && probability > 0) {
      probability -= 20;
      reason += " but humidity is too low";
    }

    // Precipitation presence increases probability
    if (data.precip_mm > 2 && probability > 0) {
      probability += 30;
      reason += " and significant precipitation";
    } else if (data.precip_mm > 0 && probability > 0) {
      probability += 15;
      reason += " and some precipitation";
    }

    probability = Math.min(Math.max(probability, 0), 100);
    return { probability, reason };
  };

  // Add useEffect to calculate probability whenever customWeather changes
  React.useEffect(() => {
    const result = calculateSnowProbability(customWeather);
    setSnowProbability(result);
  }, [customWeather]);
  return (
    <div className="p-4 md:p-8">
      <Card className="md:w-1/2 mx-auto mt-4">
        <CardHeader>
          <CardTitle>Custom Snow Calculator</CardTitle>
          <CardDescription>
            Input your own weather parameters to calculate snow probability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="temperature">
                Temperature (°C): {customWeather.temp_c}
              </Label>
              <Slider
                id="temperature"
                min={-20}
                max={10}
                step={0.5}
                value={[customWeather.temp_c]}
                onValueChange={(value) =>
                  setCustomWeather((prev) => ({
                    ...prev,
                    temp_c: value[0],
                  }))
                }
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="humidity">
                Humidity (%): {customWeather.humidity}
              </Label>
              <Slider
                id="humidity"
                min={0}
                max={100}
                step={1}
                value={[customWeather.humidity]}
                onValueChange={(value) =>
                  setCustomWeather((prev) => ({
                    ...prev,
                    humidity: value[0],
                  }))
                }
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="precipitation">
                Precipitation (mm): {customWeather.precip_mm}
              </Label>
              <Slider
                id="precipitation"
                min={0}
                max={10}
                step={0.1}
                value={[customWeather.precip_mm]}
                onValueChange={(value) =>
                  setCustomWeather((prev) => ({
                    ...prev,
                    precip_mm: value[0],
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Current Condition</Label>
              <select
                id="condition"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={customWeather.condition}
                onChange={(e) =>
                  setCustomWeather((prev) => ({
                    ...prev,
                    condition: e.target.value,
                  }))
                }
              >
                <option value="clear">Clear</option>
                <option value="snow">Snowing</option>
                <option value="rain">Raining</option>
                <option value="overcast">Overcast</option>
                <option value="blizzard">Blizzard</option>
              </select>
            </div>

            {snowProbability && (
              <div className="mt-6 p-4 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Snow Probability</h3>
                  <span className="text-2xl font-bold text-blue-600">
                    {snowProbability.probability}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {snowProbability.reason}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSnowCalculator;
