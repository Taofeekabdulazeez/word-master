import PlayerList from "./player-list";

type SideBarProps = {
  players: { name: string; total_points: number }[];
};

export function SideBar({ players }: SideBarProps) {
  return (
    <aside>
      <PlayerList players={players} />
    </aside>
  );
}
