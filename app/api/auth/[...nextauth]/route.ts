import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import validateUser from "@/Controller/auth";
import registerUser from "@/Controller/register";

const handler = NextAuth({
    pages: {
        signIn: "/login/signin",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }
                // FUNÇÃO DE LOGIN.
                if (credentials.typePost == "login") {
                    let dataUser = await validateUser(credentials.email, credentials.password);

                    if (credentials.email && credentials.password) {
                        return {
                            email: dataUser?.id,
                            name: dataUser?.name,
                            type: dataUser?.type
                        }
                    }
                }
                // FUNÇÃO DE CADASTRO.
                if (credentials.typePost == "register") {
                    let dataUser = await registerUser(credentials.name, credentials.phone, credentials.email, credentials.password, credentials.repeat);

                    if (dataUser) {
                        return {
                            email: dataUser.id,
                            name: dataUser.name,
                            type: dataUser.type
                        }
                    }
                }

                console.log(credentials);
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile?.id;
            }
            return token
        },
        async session({ session, token, user }) {
            console.log(session);
            console.log(session);

            return session
        }
    }
});

export { handler as GET, handler as POST }