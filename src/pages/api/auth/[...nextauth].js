import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const user = await axios
          .post("http://localhost:3000/api/user/signin", {
            email: credentials.username,
            password: credentials.password,
          })
          .then((res) => res.data);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          if(!user.image){
            user.image = "/profileImageDefault.png";
          }
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  database: process.env.DATABASE_URL,

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/signin", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(user, account, profile) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        console.log("user :>> ", user);
        // return "/"
        return true;
      } else {
        // Return false to display a default error message

        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    async redirect(url, baseUrl) {
      // console.log(`url`, url,"--", baseUrl);

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  session: { jwt: true },
});
