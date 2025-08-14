import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/mongodb";
import User from "@/models/userSchema";
import Student from "@/models/studentSchema";

export const authOptions = {
  // Redirects to login page
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,

  // 1. Set session to JWT
  session: {
    strategy: "jwt",
    maxAge: 12*60*60, //12 hours
    updateAge: 0,
  },

  // 2. Set JWT expiry explicitly
  jwt: {
    maxAge: 12*60*60, // 30 seconds
    updateAge: 0,
  },

  providers: [
    CredentialsProvider({
      name: "Next Auth",
      credentials: {
        userName: { label: "userName", type: "text" },
        password: { label: "password", type: "password" },
        role: { label: "role", type: "text" },
        registrationNo: { label: "registrationNo", type: "text" },
        contact: { label: "contact", type: "text" },
      },
      async authorize(credentials, req) {
         connect();
        // Staff login
        if (credentials.userName && credentials.password) {
          const user = await User.findOne({
            userName: credentials.userName,
          });  
          if (user) {
            return {
              id: user._id.toString(),
              userName: user.userName,
              role: user.role,
            };
          }
        }

        // Student login
        if (credentials.registrationNo && credentials.contact) {
          const student = await Student.findOne({
            registrationNo: credentials.registrationNo,
            contact1: credentials.contact
          });
          if (student) {
            return {
              id: student._id.toString(),
              registrationNo: student.registrationNo,
              contact: student.contact1,
              role: credentials.role,
            };
          }
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && user.role==="student") {
        token.id = user.id;
        token.registrationNo = user.registrationNo;
        token.role = user.role;
      }
      if(user && (user.role==="admin" || user.role==="teacher")) {
        token.id = user.id;
        token.userName = user.userName;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && token.role === "student") {
        session.user.id = token.id;
        session.user.registrationNo = token.registrationNo;
        session.user.role = token.role;
      }
      if (token && (token.role === "admin" || token.role === "teacher")) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default authOptions;