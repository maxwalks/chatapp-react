import Auth from "./Auth";
import { Toaster } from "@/components/ui/sonner"

const Register = () => {
  return (
    <>
        <div className="mt-20">
            <Auth link="http://localhost:3001/auth/register" text="Create an account"/>
        </div>
        <Toaster dark/>
    </>
  );
};

export default Register;