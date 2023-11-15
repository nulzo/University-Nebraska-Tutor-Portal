import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";

export default function getUserName() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    if (isAuthenticated) {
        return (
            instance.getAllAccounts()[0].name
        )
    }
}