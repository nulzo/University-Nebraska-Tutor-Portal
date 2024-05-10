import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@radix-ui/themes";
import UNO from "@/components/assets/UNO";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import MicrosoftIcon from "@/components/assets/MicrosoftIcon";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginPage({ className, ...props }: UserAuthFormProps) {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [isAuthCompleted, setIsAuthCompleted] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthCompleted && isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthCompleted, isAuthenticated]);

  const handleLogin = async () => {
    await instance.loginPopup(loginRequest);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    await handleLogin();
    setIsAuthCompleted(true);
  }

  return (
    <>
      <div className="container mt-52 flex-col items-center justify-center md:grid lg:max-w-none sm:w-full lg:px-0">
        <div className="p-8 border rounded-md">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Select an option below to log in
              </p>
            </div>
            <div className={cn("grid gap-6", className)} {...props}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <Button className="space-y-4">
                    <MicrosoftIcon />
                    Microsoft Sign On
                  </Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or login with
                  </span>
                </div>
              </div>
              <Button variant="outline" type="button">
                <UNO width="24" height="24" />
                Single Sign On
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {/* <div className="flex pt-10 items-center text-center justify-end text-lg font-medium">
            <UNO width="16" height="16" />
            <div className="pl-2 text-sm">University of Nebraska - Omaha</div>
          </div> */}
        </div>
      </div>
    </>
  );
}
