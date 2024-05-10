import { Button } from "../ui/button";
import Notification from "../ui/notification";

export default function Navlink({
  className,
  isActive,
  onClick,
  text,
  icon,
  notification = false,
  disabled = false,
}: any) {
  return (
    <Button
      className={className}
      variant={isActive ? "secondary" : "ghost"}
      onClick={onClick}
      disabled={disabled}
    >
      {notification && (
        <div>
          <Notification />
        </div>
      )}
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </Button>
  );
}
