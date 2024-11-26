import React from "react";
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

const astroServices = [
  {
    title: "Group Puja",
    description:
      "Join our group pujas for spiritual enlightenment and blessings.",
    icon: <IconHeart size={32} />,
    link: "/astro-services/group-puja",
  },
  {
    title: "VIP Puja",
    description:
      "Join our VIP pujas for spiritual enlightenment and blessings.",
    icon: <IconSun size={32} />,
    link: "/astro-services/vip-puja",
  },
  {
    title: "Gemstone Recommendation",
    description: "Discover the perfect gemstone for your astrological profile.",
    icon: <IconSun size={32} />,
    link: "/astro-services/gemstone",
  },
];

export default function AstroServices() {
  return (
    <Layout fixed>
      <Layout.Header>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Astro Services</h1>
        </div>
      </Layout.Header>

      <Layout.Body className="flex flex-col">
        <p className="text-muted-foreground">
          Explore our astrological services to gain insights and guidance for
          your life's journey.
        </p>
        <Separator className="my-4 shadow" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {astroServices.map((service) => (
            <Card
              key={service.title}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-col items-center space-y-2">
                {service.icon}
                <CardTitle className="text-lg text-center">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
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
