export default function Notification() {
  return (
    <div className="relative">
      <div className="absolute bg-notification brightness-200 animate-ping h-2 w-2 rounded-full top-[-12px] left-[-2px]"></div>
      <div className="absolute bg-notification rounded-full h-2 w-2 top-[-12px] left-[-2px]"></div>
    </div>
  );
}
