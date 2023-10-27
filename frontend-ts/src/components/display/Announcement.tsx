import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cva } from "class-variance-authority";
import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  FlagIcon,
  InfoIcon,
  UsersIcon,
} from "lucide-react";

const announcementVariants = cva("", {
  variants: {
    variant: {
      default: "border-primary",
      info: "border-info",
      warning: "border-warning",
      tutor: "border-fortutor",
      alert: "border-alert",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow",
      red_outline: "border-red-400 text-gray-800 shadow-sm",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const titleVariants = cva("", {
  variants: {
    variant: {
      default: "border-primary",
      info: "text-info text-md font-bold",
      alert: "text-alert text-md font-bold",
      warning: "text-warning",
      tutor: "text-fortutor",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const bodyVariants = cva("", {
  variants: {
    variant: {
      default: "border-primary",
      info: "text-foreground",
      warning: "text-foreground",
      tutor: "text-foreground",
      alert: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AnnouncementProps {
  className: string;
  variant: any;
  title: string;
  body: string;
}

function AnnouncementIcon({ variant }: any) {
  switch (variant) {
    case "default":
      return <FlagIcon className="h-4 w-4 mr-2" />;
    case "alert":
      return <AlertTriangleIcon className="h-4 w-4 mr-2" />;
    case "info":
      return <InfoIcon className="h-4 w-4 mr-2 stroke-info" />;
    case "warning":
      return <AlertOctagonIcon className="h-4 w-4 mr-2 stroke-warning" />;
    case "tutor":
      return <UsersIcon className="h-4 w-4 mr-2 stroke-fortutor" />;
  }
}

function Announcement({ className, variant, title, body }: AnnouncementProps) {
  const attributes = `${announcementVariants({ variant })} ${className}`;
  const titleAttributes = `${titleVariants({ variant })} flex items-center`;
  const bodyAttributes = `${bodyVariants(variant)}`;
  return (
    <>
      <Alert className={attributes}>
        <AlertTitle className={titleAttributes}>
          <AnnouncementIcon variant={variant} />
          {title}
        </AlertTitle>
        <AlertDescription className={bodyAttributes}>{body}</AlertDescription>
      </Alert>
    </>
  );
}

export { Announcement, announcementVariants };
