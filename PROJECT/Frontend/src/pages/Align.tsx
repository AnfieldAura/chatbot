import { Link } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div
        className="absolute inset-0 bg-repeat opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23ffffff' fill-opacity='0.2'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <div className="flex flex-col md:flex-row gap-32 items-center justify-center">
          {/* Student Option */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-56 h-56 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-36 h-36 text-blue-800" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-400 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mt-8 mb-4">STUDENT</h2>
            <Link to="/student-login">
              <button className="px-16 py-8 bg-blue-800 text-white font-semibold text-xl rounded-full shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105">
                Student Login
              </button>
            </Link>
          </div>

          {/* Not a Student Option */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-56 h-56 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-36 h-36 text-blue-800" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-400 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mt-8 mb-4">NOT A STUDENT</h2>
            <Link to="/appLayout0">
              <button className="px-16 py-8 bg-blue-800 text-white font-semibold text-xl rounded-full shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105">
                Use without Signing In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Align;