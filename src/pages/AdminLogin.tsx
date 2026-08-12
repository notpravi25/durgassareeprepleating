import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck, Lock } from "lucide-react";

export const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast({
        title: "Password required",
        description: "Please enter your admin password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const success = await auth.login(password);
    setLoading(false);

    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Dashboard.",
      });
      
      const from = (location.state as { from?: string })?.from || "/admin";
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-5 py-12">
      <div className="mx-auto w-full max-w-md">
        <Card className="border border-border/80 bg-card/90 shadow-soft">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="font-serif text-2xl tracking-wide text-primary">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Sign in to manage Durga's Saree Pre-Pleating orders.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    autoFocus
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl pl-10"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" disabled={loading} className="w-full rounded-full h-11">
                {loading ? "Authenticating..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/")}
              >
                Return to Homepage
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
