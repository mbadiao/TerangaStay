"use client";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
} from "recharts";
import useUserStore from "@/store/userStore";

export default function Dashboard() {
  const [checkouts, setCheckouts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);
  const user = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE + "profil", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.log(
          "Erreur lors de la récupération du profil utilisateur :",
          error
        );
      }
    };

    const fetchUserCheckouts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE}checkouts/${localStorage.getItem(
            "user"
          )}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCheckouts(data);
          calculateBarChartData(data);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des checkouts :", error);
      }
    };

    const fetchUserReservations = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE
          }reservation/user/${localStorage.getItem("user")}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
          calculateChartData(data);
          calculateRadarChartData(data);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des réservations :", error);
      }
    };

    const calculateChartData = (reservations) => {
      const data = reservations.reduce((acc, reservation) => {
        const date = new Date(reservation?.propriete.createdAt);

        if (isNaN(date.getTime())) {
          console.log(
            "Format de date invalide :",
            reservation?.propriete.createdAt
          );
          return acc;
        }

        const day = date.toLocaleString("default", {
          day: "numeric",
          month: "long",
        });

        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.keys(data).map((day) => ({
        day,
        reservations: data[day],
      }));

      setChartData(formattedData);
    };

    const calculateBarChartData = (checkouts) => {
      const data = checkouts.reduce((acc, checkout) => {
        const date = new Date(checkout.createdAt);

        if (isNaN(date.getTime())) {
          console.log("Format de date invalide :", checkout.createdAt);
          return acc;
        }

        const day = date.toLocaleString("default", {
          day: "numeric",
          month: "long",
        });

        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.keys(data).map((day) => ({
        day,
        checkouts: data[day],
      }));

      setBarChartData(formattedData);
    };

    const calculateRadarChartData = (reservations) => {
      const data = reservations.reduce((acc, reservation) => {
        const month = new Date(reservation?.propriete.createdAt).toLocaleString(
          "default",
          { month: "long" }
        );

        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.keys(data).map((month) => ({
        month,
        reservations: data[month],
      }));

      setRadarChartData(formattedData);
    };

    fetchUserProfile();
    fetchUserCheckouts();
    fetchUserReservations();
  }, [setProfile]);

  return (
    <div className="min-h-screen p-4 mx-auto">
      <div className="text-center text-5xl mb-5">
        Bonjour{" "}
        <span className="text-primary bold">
          {" "}
          {user?.name} {user?.lastname} 👋{" "}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Card className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <CardHeader>
            <CardTitle>Statistiques de Checkouts</CardTitle>
            <CardDescription>
              Nombre de checkouts pour les derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                checkouts: { label: "Checkouts", color: "hsl(var(--primary))" },
              }}
            >
              <BarChart accessibilityLayer data={barChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="checkouts"
                  fill="var(--color-checkouts)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              En baisse de 15,2% ce mois-ci <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Juillet 2024
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <CardHeader>
            <CardTitle>Statistiques de Réservations</CardTitle>
            <CardDescription>
              Statistiques des réservations pour les derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                reservations: {
                  label: "Réservations",
                  color: "hsl(var(--primary))",
                },
              }}
            >
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="reservations"
                  type="natural"
                  fill="var(--color-reservations)"
                  fillOpacity={0.4}
                  stroke="var(--color-reservations)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  En baisse de 35,2% ce mois-ci{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Juillet 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full lg:w-1/3 p-2 mb-4">
          <CardHeader>
            <CardTitle>Réservations par Mois (Radar Chart)</CardTitle>
            <CardDescription>Nombre de réservations par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                reservations: {
                  label: "Réservations",
                  color: "hsl(var(--primary))",
                },
              }}
            >
              <RadarChart
                outerRadius={90}
                width={500}
                height={300}
                data={radarChartData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  name="Réservations"
                  dataKey="reservations"
                  stroke="var(--color-reservations)"
                  fill="var(--color-reservations)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
