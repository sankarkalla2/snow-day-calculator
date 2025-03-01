import Image from "next/image";
import FeedbackForm from "./feedback";
import { Button } from "./ui/button";
import { Calendar, LucideCalendarRange } from "lucide-react";

const ExtraCards = () => {
  return <div className="mt-8">
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    <FeedbackForm />
    <Button
      variant="outline"
      className="h-auto py-4"
      onClick={() =>
        window.open(
          "https://www.paypal.com/paypalme/gowrisankarkalla?country.x=IN&locale.x=en_GB",
          "_blank"
        )
      }
    >
      <div className="flex flex-col items-center gap-1">
        <Image src="/paypal.png" alt="Paypal" width={20} height={20} />
        <span className="text-xs">Support Us</span>
      </div>
    </Button>

    <Button variant="outline" className="h-auto py-4" disabled>
      <div className="flex flex-col items-center gap-1">
        <Calendar className="h-5 w-5" />
        <span className="text-xs">Future snow forecast</span>
        <span className="text-[10px] text-muted-foreground">Soon</span>
      </div>
    </Button>

    <Button variant="outline" className="h-auto py-4" disabled>
      <div className="flex flex-col items-center gap-1">
        <LucideCalendarRange className="h-5 w-5" />
        <span className="text-xs">Snow History</span>
        <span className="text-[10px] text-muted-foreground">Soon</span>
      </div>
      </Button>
    </div>
  </div>;
};

export default ExtraCards;
