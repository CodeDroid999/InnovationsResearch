import CardsSection from 'components/ClientUI/cards-section'
import ClientLayout from 'components/ClientUI/ClientLayout'
import MobileCardsSection1 from 'components/ClientUI/MobileCardsSection1'
import MobileCardsSection2 from 'components/ClientUI/MobileCardsSection2'
import RulesComponent from 'components/ClientUI/rules-list'
import TopNavigation from 'components/ClientUI/top-nav'
import { UserAuth } from 'context/AuthContext'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Index() {

  const [loading, setLoading] = useState(true);
  const { user, userRole } = UserAuth();

  useEffect(() => {
    // Check if user is authenticated when authentication state is loaded
    if (!loading) {
      if (user) {
        console.log({ userRole })
        toast.success("Logged In");
      } else {
        toast.error("Log In to proceed");
        router.push('/auth/sign-in');
      }
    }
  }, [user, loading, userRole]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    // Clean up timeout when component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ClientLayout>
      <div className="flex flex-col justify-items-right md:w-[85vw] w-[80vw] ">
        <TopNavigation />
        <CardsSection />
        <MobileCardsSection1 />
        <MobileCardsSection2 />
        <RulesComponent />
      </div>
    </ClientLayout>
  )
}



