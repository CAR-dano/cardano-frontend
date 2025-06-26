import { useRouter } from "next/navigation";
import { saveRedirectUrl } from "../utils/redirectUtils";

/**
 * Custom hook for handling login redirects
 * @param redirectUrl - Optional specific URL to redirect to after login. If not provided, uses current page
 * @returns Function to navigate to auth page with redirect saved
 */
export const useLoginRedirect = (redirectUrl?: string) => {
  const router = useRouter();

  const navigateToAuth = () => {
    saveRedirectUrl(redirectUrl);
    router.push("/auth");
  };

  return navigateToAuth;
};
