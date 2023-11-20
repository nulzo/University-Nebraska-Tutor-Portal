import { ShipWheelIcon, SigmaIcon, SwordsIcon, WavesIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function GenericDepartmentIcon({ icon, description, className }: any) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>{icon}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-background border border-border text-foreground">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CSCIIcon() {
  return (
    <GenericDepartmentIcon
      icon={<SigmaIcon size={12} />}
      className="bg-red-500 w-[15px] rounded text-center h-[15px] flex content-center items-center justify-center"
      description="CSCI Type Beat"
    />
  );
}

export function CISTIcon() {
  return (
    <GenericDepartmentIcon
      icon={<SwordsIcon size={12} />}
      className="bg-indigo-500 w-[15px] rounded text-center h-[15px] flex content-center items-center justify-center"
      description="CIST Type Beat"
    />
  );
}

export function ISQAIcon() {
  return (
    <GenericDepartmentIcon
      icon={<ShipWheelIcon size={12} />}
      className="bg-orange-500 w-[15px] rounded text-center h-[15px] flex content-center items-center justify-center"
      description="ISQA Type Beat"
    />
  );
}

export function BIOIIcon() {
  return (
    <GenericDepartmentIcon
      icon={<WavesIcon size={12} />}
      className="bg-sky-500 w-[15px] rounded text-center h-[15px] flex content-center items-center justify-center"
      description="BIOI Type Beat"
    />
  );
}

export function CYBRIcon() {
  return (
    <GenericDepartmentIcon
      icon={<SwordsIcon size={12} />}
      className="bg-green-500 w-[15px] rounded text-center h-[15px] flex content-center items-center justify-center"
      description="CYBR Type Beat"
    />
  );
}
