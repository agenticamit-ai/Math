"use client";

import { CartesianGrid, Legend, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type TrendPoint = { label: string; wpm: number; err: number; title: string };

export function TrendChart({ data, benchmark }: { data: TrendPoint[]; benchmark?: { low: number; high: number } }) {
  if (data.length < 2)
    return <p className="rounded-xl bg-paper px-4 py-8 text-center text-sm text-muted">The chart appears after two valid first reads.</p>;
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
          <CartesianGrid stroke="#E6E0D4" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#5B6472" }} tickLine={false} axisLine={{ stroke: "#E6E0D4" }} />
          <YAxis tick={{ fontSize: 12, fill: "#5B6472" }} tickLine={false} axisLine={false} width={48} />
          {benchmark && (
            <ReferenceArea y1={benchmark.low} y2={benchmark.high} fill="#E9A23B" fillOpacity={0.08} stroke="none" ifOverflow="extendDomain" />
          )}
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E6E0D4", fontSize: 13 }}
            labelFormatter={(_, p) => (p?.[0]?.payload as TrendPoint | undefined)?.title ?? ""}
            formatter={(v, name) => [Math.round(Number(v ?? 0)), String(name)]}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Line type="monotone" dataKey="wpm" name="Words per minute" stroke="#2F6F6A" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="err" name="Effective rate (WPM × accuracy)" stroke="#E9A23B" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
