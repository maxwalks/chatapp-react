import Auth from "./Auth";
import { Toaster } from "@/components/ui/sonner"

const Register = () => {
  return (
    <>
        <div className="mt-20">
            <Auth />
        </div>
        <Toaster />
    </>
  );
};

export default Register;