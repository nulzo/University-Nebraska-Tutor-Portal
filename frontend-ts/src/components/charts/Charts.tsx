import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 100),
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#333333"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#333333"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#D71920" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}