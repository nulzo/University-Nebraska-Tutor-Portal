// import { LoaderIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   MsalAuthenticationTemplate,
//   useIsAuthenticated,
// } from "@azure/msal-react";
// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../authConfig";
// import MicrosoftIcon from "@/components/assets/MicrosoftIcon";
// import { InteractionType } from "@azure/msal-browser";
//
// function Loading() {
//   return <LoaderIcon />;
// }
//
// export default function LoginForm() {
//   const { instance, inProgress } = useMsal();
//
//   function onSubmit(loginType: string) {
//     // if (loginType === "popup") {
//     //     instance.loginPopup(loginRequest).catch(e) => {
//     //         console.log(e);
//     //     }
//     // }
//     <MsalAuthenticationTemplate
//       interactionType={InteractionType.Popup}
//       authenticationRequest={loginRequest}
//       loadingComponent={Loading}
//     >
//       <p>erm</p>
//     </MsalAuthenticationTemplate>;
//   }
//
//   return (
//     <form onSubmit={onSubmit}>
//       <div className="grid gap-2">
//         <Button disabled={inProgress != "login"} className="space-y-4">
//           {inProgress != "login" ? (
//             <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
//           ) : (
//             <MicrosoftIcon />
//           )}{" "}
//           Microsoft Sign On
//         </Button>
//       </div>
//     </form>
//   );
// }
