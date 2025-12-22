// Fahim
"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
    { date: "21 Dec", logins: 186, newBusinesses: 80 },
    { date: "22 Dec", logins: 305, newBusinesses: 200 },
    { date: "23 Dec", logins: 237, newBusinesses: 120 },
    { date: "24 Dec", logins: 73, newBusinesses: 190 },
    { date: "25 Dec", logins: 209, newBusinesses: 130 },
    { date: "26 Dec", logins: 214, newBusinesses: 140 },
    { date: "27 Dec", logins: 219, newBusinesses: 170 },
]

const chartConfig = {
    logins: {
        label: "Logins",
        color: "var(--chart-1)",
    },
    newBusinesses: {
        label: "New Businesses",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function Chart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Activity Over Time</CardTitle>
                {/* <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription> */}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[350px]">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 6)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={3}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Area
                            dataKey="logins"
                            type="natural"
                            fill="var(--color-logins)"
                            fillOpacity={0.4}
                            stroke="var(--color-logins)"
                            stackId="a"
                        />
                        <Area
                            dataKey="newBusinesses"
                            type="natural"
                            fill="var(--color-newBusinesses)"
                            fillOpacity={0.4}
                            stroke="var(--color-newBusinesses)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    )
}
