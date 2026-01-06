"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, User, Lock, UserCheck } from "lucide-react";
import Image from "next/image";
import {signIn} from 'next-auth/react';
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    registrationNo: "",
    contact: "",
    role: "student",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // // Validation

    if (formData.role==="student" &&  (!formData.registrationNo || !formData.contact)) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if ((formData.role==="teacher" || formData.role==="admin") &&  (!formData.userName || !formData.password  )) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    // Simulate login
    try {
      const result = await axios.post("/api/auth/login", formData);
    if (result.status === 200) {
      signIn("credentials", {
          userName: formData.userName,
          password: formData.password,
          registrationNo: formData.registrationNo,
          contact: formData.contact,
          role: formData.role,
          callbackUrl: `/${result.data.url}`,
        });
      }

      setIsLoading(false);
    } catch (error) {
      setError(error.response?.data?.errors || "Something went wrong.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const getRoleIcon = () => {
    switch (formData.role) {
      case "student":
        return <User className="h-4 w-4" />;
      case "teacher":
      case "admin":
        return <UserCheck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getRoleDescription = () => {
    switch (formData.role) {
      case "student":
        return "Access your courses, grades, & assignments";
      case "teacher":
        return "Manage classes, students, & course materials";
      case "admin":
        return "Full system access & administrative controls";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left - Form */}
      <div className="flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-4">
          <div className="text-center ">
            <h1 className="text-3xl font-bold tracking-tight">Welcome </h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Choose your role and enter your credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Select Your Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Student
                        </div>
                      </SelectItem>
                      <SelectItem value="teacher">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4" /> Teacher
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4" /> Administrator
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.role && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {getRoleIcon()} {getRoleDescription()}
                    </p>
                  )}
                </div>

                {/* User Name */}
                <div className="space-y-2">
                  {formData.role === "student" ? (
                    <>
                      <Label htmlFor="registrationNo">Registration No</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="registrationNo"
                          type="text"
                          value={formData.registrationNo}
                          onChange={(e) =>
                            handleInputChange("registrationNo", e.target.value)
                          }
                          className="pl-10"
                          placeholder="Enter your Registration No"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Label htmlFor="userName">User Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="userName"
                          type="text"
                          value={formData.userName}
                          onChange={(e) =>
                            handleInputChange("userName", e.target.value)
                          }
                          className="pl-10"
                          placeholder="Enter your User Name"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  {formData.role === "student" ? (
                    <>
                      <Label htmlFor="contact">Contact No</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="contact"
                          type="text"
                          value={formData.contact}
                          onChange={(e) =>
                            handleInputChange("contact", e.target.value)
                          }
                          className="pl-10 pr-10"
                          placeholder="Enter your contact number"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="pl-10 pr-10"
                          placeholder="Enter your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* Info Box */}
                {formData.role && (
                  <div className="mt-4 p-3 bg-muted rounded-lg text-sm flex items-start gap-2">
                    {getRoleIcon()}
                    <span className="text-muted-foreground">
                      {getRoleDescription()}
                    </span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <a
              href="https://wa.me/923112306050"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              Contact School
            </a>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0">
          <Image
            src="/home/fssbuilding.jpg"
            alt="Education background"
            fill
            className="object-fit"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
