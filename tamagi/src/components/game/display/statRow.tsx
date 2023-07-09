import Stat, { StatProps } from "@/components/game/display/stat";

export default function StatRow(props: StatRowProps) {
  const stats = props.stats.map((stat, i) => {
    return <Stat key={i} statType={stat.statType}></Stat>;
  });

  return (
    <div className="flex flex-row flex-wrap gap-2 bg-gray-100 w-[100%]">
      {stats}
    </div>
  );
}

type StatRowProps = { stats: StatProps[] };
