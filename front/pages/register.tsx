import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Register from '@/components/register'
import { GetServerSidePropsContext } from 'next'
import cookies from 'next-cookies'

export default function Home() {
  return (
    <>
      <Navbar/>
      <Register/>
      <Footer/>
    </>
  )
}

export const getServerSideProps = async(context:GetServerSidePropsContext) => {
  
  const cookie = cookies(context)

  if (cookie.token) {
    const { res } = context;
    res.setHeader("location", "/dashboard");
    res.statusCode = 302;
    res.end();
    return;
  }

  return {
      props: { }
  }
}
