import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";

const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "1060924577987-2e0j8rd6o8vblqam1rsi73ga468mjeqr.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        async authorize(credentials) {
            //Check if the user exists.
            await connect();
    
            try {
              const user = await User.findOne({
                email: credentials.email,
              });
    
              if (user) {
    
                if (credentials.password === user.password) {
                  return user;
                } else {
                  throw new Error("Wrong Credentials!");
                }
              } else {
                throw new Error("User not found!");
              }
            } catch (err) {
              throw new Error(err);
            }
          },
      })
  ],
  pages: {
    error: "/tasksManagement",
  },

  
});


export {authOptions as GET, authOptions as POST};