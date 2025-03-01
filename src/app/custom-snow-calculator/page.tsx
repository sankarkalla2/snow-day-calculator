import CustomerSnowCalculator from "@/components/custom-calculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "custom-snow-calculator",
};

const CustomSnowCalculatorPage = () => {
  return <CustomerSnowCalculator />;
};

export default CustomSnowCalculatorPage;
