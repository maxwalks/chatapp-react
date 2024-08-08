import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';
import Chatbox from '@/components/Chatbox';

export default async function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('jwt')?.value;
  if (!token) {
    redirect('/auth/login');
  }
  try {
    const response = await axios.post('http://localhost:3001/authenticate', {}, {
      headers: {
        Cookie: `jwt=${token}`,
      },
    });
    if (response.status === 200) {
      return (
        <Chatbox cookie={token} />
      );
    }
  } catch (error) {
    if (error.response && (error.response.status === 400 || error.response.status === 401)) {
      redirect('/auth/login');
    }
    console.log(error)
  }
  return null;
}