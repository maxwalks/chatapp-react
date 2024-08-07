import axios from "axios"
import nookies from "nookies"

export default function Home () {

  return (
    <>
      <h1>
        Home
      </h1>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const token = cookies.jwt;
  try {
    const response = await axios.post('http://localhost:3001/authentication', {}, {
      headers: {
        Cookie: `jwt=${token}`
      }
    });
    console.log(response)
  } catch (error) {
    if (error.response.status === 400) {
      redirect("/login")
    } else if (error.response.status === 401) {
      redirect("/login")
    }

  }
};