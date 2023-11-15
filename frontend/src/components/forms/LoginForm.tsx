import { LoaderIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PiIcon } from "lucide-react";
import { Link } from "@radix-ui/themes";
import UNO from "@/components/assets/UNO";
import {
  MsalAuthenticationTemplate,
  useIsAuthenticated,
} from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import MicrosoftIcon from "@/components/assets/MicrosoftIcon";
import { InteractionType } from "@azure/msal-browser";

function Loading() {
  return <LoaderIcon />;
}

export default function LoginForm() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  function onSubmit(loginType: string) {
    // if (loginType === "popup") {
    //     instance.loginPopup(loginRequest).catch(e) => {
    //         console.log(e);
    //     }
    // }
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Popup}
      authenticationRequest={loginRequest}
      loadingComponent={Loading}
    >
      <p>erm</p>
    </MsalAuthenticationTemplate>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Button disabled={inProgress != "login"} className="space-y-4">
          {inProgress != "login" ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MicrosoftIcon />
          )}{" "}
          Microsoft Sign On
        </Button>
      </div>
    </form>
  );
}
