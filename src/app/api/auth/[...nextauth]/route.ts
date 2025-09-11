import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          // Assuming apiClient is a utility for making requests to your backend
          // You might need to adjust the import path for apiClient
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id_token: account.id_token,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // You can store the backend token or user data in the session if needed
            // For example: user.backendToken = data.token;
            return true;
          } else {
            // Handle backend authentication failure
            console.error(
              "Backend authentication failed:",
              response.statusText
            );
            return false;
          }
        } catch (error) {
          console.error("Error during backend authentication:", error);
          return false;
        }
      }
      return true; // Allow other providers to sign in
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the id_token to the JWT token
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token; // Store Google ID token
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, such as an access_token from a provider.
      session.accessToken = token.accessToken;
      session.idToken = token.idToken; // Make Google ID token available in session
      return session;
    },
  },
  pages: {
    signIn: "/auth", // Specify your custom sign-in page
  },
});

export { handler as GET, handler as POST };
