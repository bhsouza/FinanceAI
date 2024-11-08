"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#fff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55882E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionPieChart = ({
  typesPercentage,
  investmentsTotal,
  depositsTotal,
  expensesTotal,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFF",
    },
  ];
  return (
    <Card className="flex flex-col p-10">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="space-y-3">
        <PercentageItem
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          value={typesPercentage[TransactionType.DEPOSIT]}
        />
        <PercentageItem
          icon={<TrendingDownIcon size={16} className="text-danger" />}
          title="Despesas"
          value={typesPercentage[TransactionType.EXPENSE]}
        />
        <PercentageItem
          icon={<PiggyBankIcon size={16} />}
          title="Investimento"
          value={typesPercentage[TransactionType.INVESTMENT]}
        />
      </div>
    </Card>
  );
};

export default TransactionPieChart;
