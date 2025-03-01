"use client";

import React, {  useState } from "react";
import {
  Search,
  MapPin,
  Globe,
  Snowflake,
  MapPinned,
  Loader2,
  Crosshair,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorldCitiesSelect } from "./world-cities-select";
import { toast } from "sonner";

import ExtraCards from "./extra-cards";
import Image from "next/image";


interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
  };
}

function calculateSnowProbability(weatherData: WeatherResponse): {
  probability: number;
  reason: string;
} {
  const temp = weatherData.current.temp_c;
  const humidity = weatherData.current.humidity;
  const precip = weatherData.current.precip_mm;
  const condition = weatherData.current.condition.text.toLowerCase();

  let probability = 0;
  let reason = "";

  // Check if it's already snowing
  if (condition.includes("snow") || condition.includes("blizzard")) {
    probability = 100;

    reason = "It's currently snowing";
    return { probability, reason };
  }

  // Temperature is the primary factor
  if (temp > 3) {
    probability = 0;
    reason = "Temperature is too high for snow";
  } else if (temp <= 3 && temp > 0) {
    probability = 25;
    reason = "Temperature is near freezing point";
  } else if (temp <= 0 && temp > -15) {
    probability = 50;
    reason = "Temperature is ideal for snow";
  } else {
    probability = 30; // Too cold for heavy snow
    reason = "Temperature is very cold";
  }

  // Humidity is crucial for snow formation
  if (humidity > 90 && probability > 0) {
    probability += 30;
    reason += " with very high humidity";
  } else if (humidity > 70 && probability > 0) {
    probability += 20;
    reason += " with high humidity";
  } else if (humidity < 40 && probability > 0) {
    probability -= 20;
    reason += " but humidity is too low";
  }

  // Precipitation presence increases probability
  if (precip > 2 && probability > 0) {
    probability += 30;
    reason += " and significant precipitation";
  } else if (precip > 0 && probability > 0) {
    probability += 15;
    reason += " and some precipitation";
  }

  // Cap probability at 100%
  probability = Math.min(probability, 100);
  // Ensure probability isn't negative
  probability = Math.max(probability, 0);

  return { probability, reason };
}

const SnowDayCalculator = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipLoading, setIpLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [ip, setIp] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (destination === "") {
      if (location !== "") {
        setDestination(location);
      } else if (ip !== "") {
        setDestination(ip);
      } else if (lng !== "" && lat !== "") {
        setDestination(`${lat},${lng}`);
      } else if (zipcode !== "" && zipcode !== null) {
        setDestination(zipcode);
      } else {
        toast.error("Error", {
          description: "Please give any single input.",
        });
        return;
      }
    }
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?q=${destination}&key=e6a0f26801da4fa883b31010252502`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.error) {
        toast.error("Error", {
          description: data.error.message,
        });
        return;
      }

      console.log(data);
      setWeatherData(data);
      toast.success("Weather Updated", {
        description: `Weather information retrieved for ${data.location.name}`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to fetch weather data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMyIp = async () => {
    try {
      setIpLoading(true);
      // Using ipify API - it's free and doesn't require authentication
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
      setDestination(data.ip);
      toast.success("IP Address Retrieved", {
        description: "Your IP address has been automatically detected.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description:
          "Failed to retrieve IP address. Please try again or enter manually.",
      });
    } finally {
      setIpLoading(false);
    }
  };

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Error", {
        description: "Geolocation is not supported by your browser.",
      });
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Round to 4 decimal places for reasonable precision
        setLat(position.coords.latitude.toFixed(4));
        setLng(position.coords.longitude.toFixed(4));
        setDestination(
          `${position.coords.latitude.toFixed(
            4
          )},${position.coords.longitude.toFixed(4)}`
        );
        toast.success("Location Retrieved", {
          description: "Your coordinates have been automatically detected.",
        });
        setGeoLoading(false);
      },
      (error) => {
        let errorMessage = "Failed to retrieve location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to use this feature.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        toast.error("Error", {
          description: errorMessage,
        });
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="mx-auto overflow-hidden md:w-[80%] max-w-[100vw]">
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 ">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Snow Day Calculator</CardTitle>
            <CardDescription>
              Enter your location to check the probability of a snow day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="zipcode" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="zipcode" className="flex gap-2 ">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">Postal Code</span>
                </TabsTrigger>
                <TabsTrigger value="city" className="flex  gap-2 ">
                  <Search className="h-4 w-4" />
                  <span className="text-xs">City</span>
                </TabsTrigger>
                <TabsTrigger value="coordinates" className="flex  gap-2 ">
                  <MapPinned className="h-4 w-4" />
                  <span className="text-xs">Coordinates</span>
                </TabsTrigger>
                <TabsTrigger value="ip" className="flex gap-2 ">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">IP Address</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <TabsContent value="zipcode">
                  <div className="space-y-2">
                    <Label htmlFor="zipcode">Postal/Zip Code</Label>
                    <Input
                      id="zipcode"
                      type="text"
                      placeholder="Enter code (e.g., 12345, SW1A 1AA)"
                      value={zipcode}
                      onChange={(e) => {
                        setZipcode(e.target.value);
                        setDestination(e.target.value);
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepts US ZIP codes (12345), UK postcodes (SW1A 1AA), or
                      Canadian postal codes (A1A 1A1)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="city">
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="city">City Name</Label>
                    <WorldCitiesSelect
                      setLocation={setLocation}
                      setDestination={setDestination}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter city name, optionally followed by state/country for
                      better accuracy
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="coordinates">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getMyLocation}
                        disabled={geoLoading}
                        className="mb-2"
                      >
                        {geoLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Detecting
                          </>
                        ) : (
                          <>
                            <Crosshair className="h-4 w-4 mr-2" />
                            Get My Location
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="text"
                        placeholder="Enter latitude (e.g., 40.7128)"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="text"
                        placeholder="Enter longitude (e.g., -74.0060)"
                        value={lng}
                        onChange={(e) => {
                          setLng(e.target.value);
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter coordinates in decimal degrees format or click &quot;Get
                      My Location&uqot; to detect automatically
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="ip">
                  <div className="space-y-2">
                    <Label htmlFor="ip">IP Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="ip"
                        type="text"
                        placeholder="Enter IP address or use auto-detect"
                        value={ip}
                        onChange={(e) => {
                          setIp(e.target.value);
                          setDestination(e.target.value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getMyIp}
                        disabled={ipLoading}
                      >
                        {ipLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Detecting
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4 mr-2" />
                            Get My IP
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click &quot;Get My IP&quot; to automatically detect your IP address,
                      or enter one manually
                    </p>
                  </div>
                </TabsContent>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Snowflake className="mr-2 h-4 w-4" />
                      Check Snow Day Probability
                    </>
                  )}
                </Button>
              </form>
            </Tabs>

            {/* Results section to be added */}
            {/* <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold">Results will appear here</h3>
            </div>
          </div> */}
          </CardContent>
        </Card>

        {weatherData && (
          <Card
            className={`w-full ${
              calculateSnowProbability(weatherData).probability > 50
                ? "bg-gradient-to-br from-blue-50 to-slate-50"
                : "bg-gradient-to-br from-amber-50 to-blue-50"
            }`}
          >
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {weatherData.location.name}, {weatherData.location.country}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {weatherData.location.localtime.split(" ")[1]}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {weatherData.location.region}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={weatherData.current.condition.icon}
                    alt={weatherData.current.condition.text}
                    className="h-12 w-12"
                  />
                  <div>
                    <div className="text-4xl font-bold">
                      {weatherData.current.temp_c}°C
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Feels like {weatherData.current.feelslike_c}°C
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-semibold ${
                      calculateSnowProbability(weatherData).probability > 75
                        ? "text-blue-700"
                        : calculateSnowProbability(weatherData).probability > 50
                        ? "text-blue-600"
                        : calculateSnowProbability(weatherData).probability > 25
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {calculateSnowProbability(weatherData).probability > 75
                      ? "Heavy Snow Expected! ❄️❄️❄️"
                      : calculateSnowProbability(weatherData).probability > 50
                      ? "Snow Likely! ❄️❄️"
                      : calculateSnowProbability(weatherData).probability > 25
                      ? "Light Snow Possible ❄️"
                      : "No Snow Expected"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {calculateSnowProbability(weatherData).probability}% chance
                    of snowfall
                  </div>
                </div>
              </div>

              <div
                className={`rounded-lg p-4 space-y-2 ${
                  calculateSnowProbability(weatherData).probability > 50
                    ? "bg-blue-50/50 border border-blue-100"
                    : "bg-white/50"
                }`}
              >
                <h3 className="font-semibold">
                  {calculateSnowProbability(weatherData).probability > 75 ? (
                    <span className="text-blue-700">
                      Winter Wonderland Alert! 🎿
                    </span>
                  ) : calculateSnowProbability(weatherData).probability > 50 ? (
                    <span className="text-blue-600">
                      Snow Day Potential! ⛄
                    </span>
                  ) : calculateSnowProbability(weatherData).probability > 25 ? (
                    <span className="text-emerald-600">
                      Light Snow Possible
                    </span>
                  ) : (
                    <span>Weather Status</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {calculateSnowProbability(weatherData).probability > 75
                    ? "Bundle up! Perfect conditions for heavy snowfall. Time for sledding, snowman building, and cozy indoor activities. Don't forget your winter gear!"
                    : calculateSnowProbability(weatherData).probability > 50
                    ? "Get your winter clothes ready! Good chance of snow accumulation. Perfect for winter activities and hot chocolate!"
                    : calculateSnowProbability(weatherData).probability > 25
                    ? "There's a chance of light snow or flurries. Keep an eye on conditions!"
                    : calculateSnowProbability(weatherData).reason}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex flex-col items-center gap-1">
                  <Wind className="h-5 w-5 text-blue-500" />
                  <div className="text-sm font-medium">
                    {weatherData.current.wind_kph} km/h
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Wind Speed
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <div className="text-sm font-medium">
                    {weatherData.current.humidity}%
                  </div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Thermometer className="h-5 w-5 text-blue-500" />
                  <div className="text-sm font-medium">
                    {weatherData.current.precip_mm} mm
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Precipitation
                  </div>
                </div>
              </div>
            </CardContent>
            {calculateSnowProbability(weatherData).probability > 50 && (
              <CardFooter>
                <div
                  className={`text-sm text-center w-full ${
                    calculateSnowProbability(weatherData).probability > 75
                      ? "text-blue-700"
                      : "text-blue-600"
                  }`}
                >
                  {calculateSnowProbability(weatherData).probability > 75
                    ? "🎿 Major snow event expected! Time to break out the snow gear! ⛄"
                    : "🎿 Good chance of snow! Stay warm and enjoy the winter weather! ⛄"}
                </div>
              </CardFooter>
            )}
          </Card>
        )}

        {!weatherData && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle>No Weather Data</CardTitle>
              <CardDescription>
                Enter a location above to check snow day probability
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
              <Snowflake className="h-12 w-12 text-blue-500 animate-pulse" />
              <p className="text-center text-muted-foreground">
                Select your preferred location method and enter details to see
                weather information and snow day predictions
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <ExtraCards />
    </div>
  );
};

export default SnowDayCalculator;
