import Footer from '@/components/footer'
import Login from '@/components/login'
import Navbar from '@/components/navbar'
import { GetServerSidePropsContext } from 'next'
import cookies from 'next-cookies'

export default function Home(props:any) {
  return (
    <>
      <Navbar/>
      <Login/>
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
