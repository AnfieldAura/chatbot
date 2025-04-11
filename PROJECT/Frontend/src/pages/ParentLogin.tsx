import React from "react";
import AppLayout from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ParentLogin = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
        <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-indigo-900">Parent Login</CardTitle>
            <CardDescription className="text-indigo-700">
              Access is currently unavailable. Please check back later.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center mt-4">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white"
              onClick={() => alert("Feature under development")}
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ParentLogin;
