import { ProgressBar } from "./ProgressBar";
import { HabitList } from "./HabitsList";

import * as PopOver from "@radix-ui/react-popover";

import clsx from "clsx";
import dayjs from "dayjs";

interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  return (
    <PopOver.Root>
      <PopOver.Trigger
        className={clsx("w-10 h-10 border-2 rounded-lg", {
          " bg-zinc-900 border-zinc-800": completedPercentage === 0,
          "bg-violet-900 border-violet-700":
            completedPercentage > 0 && completedPercentage < 20,
          "bg-violet-800 border-violet-600":
            completedPercentage >= 20 && completedPercentage < 40,
          "bg-violet-700 border-violet-500":
            completedPercentage >= 40 && completedPercentage < 60,
          "bg-violet-600 border-violet-500":
            completedPercentage >= 60 && completedPercentage < 80,
          "bg-violet-500 border-violet-400": completedPercentage >= 80,
        })}
      />

      <PopOver.Portal>
        <PopOver.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col border-2 border-purple-500">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitList date={date}/>

          <PopOver.Arrow height={8} width={16} className="fill-zinc-900" />
        </PopOver.Content>
      </PopOver.Portal>
    </PopOver.Root>
  );
}
