import Auth from "./Auth";

const Register = () => {
  return (
    <>
        <Auth link="http://localhost:3001/auth/register" authMethod="Register"/>
    </>
  );
};

export default Register;