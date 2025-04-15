import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Align = () => {
  const { toast } = useToast();

  const handleParentLoginClick = () => {
    toast({
      title: "Parent Login",
      description: "Access is currently unavailable.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">Choose Your Path</h1>
        <p className="text-lg text-indigo-700">Select whether you're a student or parent to continue</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <GraduationCap className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
            <CardTitle className="text-2xl text-indigo-900">Students</CardTitle>
            <CardDescription>Access your learning dashboard, assignments.</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600 pb-4">
            <p>Track your progress (attendance, results)</p>
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            <Link to="/student-login">
              <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg">
                Student Login
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <Users className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
            <CardTitle className="text-2xl text-indigo-900">Not a Student?</CardTitle>
            <CardDescription>You can still use the chatbot.</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600 pb-4">
            <p>with a no login version.</p>
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            <Link to="/appLayout0">
              <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg">
                Use without signing in
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Align;
