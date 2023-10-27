import { Button } from "../ui/button";

export default function Navlink({
  className,
  isActive,
  onClick,
  text,
  icon,
}: any) {
  return (
    <Button
      className={className}
      variant={isActive ? "secondary" : "ghost"}
      onClick={onClick}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </Button>
  );
}
