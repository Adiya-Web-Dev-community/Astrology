import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/custom/layout";
import { Separator } from "@/components/ui/separator";
import {
  IconCalendar,
  IconMoon,
  IconHeart,
  IconSun,
  IconStar,
  IconFeather,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const freeServices = [
  {
    title: "Today's Panchang",
    description:
      "Get the detailed Panchang for today, including tithi, nakshatra, and more.",
    icon: <IconCalendar size={32} />,
    link: "/free-services/todays-panchang",
  },
  {
    title: "Janam Kundali",
    description: "Generate your personalized Janam Kundali with birth details.",
    icon: <IconMoon size={32} />,
    link: "/free-services/janam-kundali",
  },
  {
    title: "Kundali Match",
    description:
      "Match Kundalis for marriage compatibility and detailed analysis.",
    icon: <IconHeart size={32} />,
    link: "/free-services/kundali-match",
  },
  {
    title: "Free Horoscope",
    description:
      "Get your daily, monthly, and yearly horoscope readings for free.",
    icon: <IconSun size={32} />,
    link: "/free-services/horoscope",
  },
  {
    title: "Shubh Muhurat",
    description:
      "Find the best Muhurat for important events like marriage, puja, etc.",
    icon: <IconStar size={32} />,
    link: "/free-services/shubh-muhurat",
  },
  {
    title: "Vrat and Upvaas",
    description: "Check upcoming Vrat and Upvaas dates and their significance.",
    icon: <IconFeather size={32} />,
    link: "/free-services/vrat-and-upvaas",
  },
];

export default function FreeServices() {
  return (
    <Layout fixed>
      <Layout.Header>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Free Services</h1>
        </div>
      </Layout.Header>

      <Layout.Body className="flex flex-col">
        <p className="text-muted-foreground">
          Explore our free services to assist you with various astrological
          insights.
        </p>
        <Separator className="my-4 shadow" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeServices.map((service) => (
            <Card key={service.title} className="hover:shadow-lg">
              <CardHeader className="flex items-center space-x-4">
                {service.icon}
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link to={service.link}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Layout.Body>
    </Layout>
  );
}
