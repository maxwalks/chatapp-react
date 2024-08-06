import Auth from "./Auth";

export default function Login () {

    return (
        <>
            <div className="mt-20">
                <Auth link="http://localhost:3001/auth/login" text="Login"/>
            </div>
        </>
    );
}