import CardsSection from 'components/ClientUI/cards-section'
import CardsTitle from 'components/ClientUI/cards-title'
import ClientLayout from 'components/ClientUI/ClientLayout'
import MobileCardsSection1 from 'components/ClientUI/MobileCardsSection1'
import MobileCardsSection2 from 'components/ClientUI/MobileCardsSection2'
import TopNavigation from 'components/ClientUI/top-nav'
import { UserAuth } from 'context/AuthContext'
import router from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Shop() {
  const title1 = "USA Bank Logs"
  const title2 = "Canadian Bank Logs"
  const title3 = "PAYPAl CASHAPP"
  const pageTitle = router.query?.id

  const user = UserAuth()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated when authentication state is loaded
    console.log(`pageTitle: ${pageTitle}`)
    if (!loading) {
      if (user) {
        toast.success("Logged In");
      } else {
        toast.error("Log In to proceed");
        router.push('/auth/sign-in');
      }
    }
  }, [user, pageTitle, loading]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    // Clean up timeout when component unmounts
    return () => clearTimeout(timeout);
  }, []);





  return (
    <ClientLayout>
      <div className="flex flex-col">
        <TopNavigation />
        <div className="col-md-12 col-sm-12 col-xs-12 bg-teal-800 text-white">
          <div className="dashboard_graph bg-teal-800 mx-4">

            <div className="row x_title">
              <div className="col-md-6">
                <CardsTitle title={pageTitle} />
              </div>
            </div>
            <div className="row bg-amber-500 p-1 rounded"></div>
            <div className="clearfix"></div>
          </div>
        </div>
        <CardsSection />
        <MobileCardsSection1 />
        <MobileCardsSection2 />
        <div className="col-md-12 col-sm-12 col-xs-12 bg-teal-800 text-white">
          <div className="dashboard_graph bg-teal-800 mx-4">

            <div className="row x_title">
              <div className="col-md-6">
                <CardsTitle title={title1} />
              </div>
            </div>
            <div className="row bg-amber-500 p-1 rounded"></div>
            <div className="clearfix"></div>
          </div>
        </div>
        <CardsSection />
        <MobileCardsSection1 />
        <MobileCardsSection2 />
        <div className="col-md-12 col-sm-12 col-xs-12 bg-teal-800 text-white">
          <div className="dashboard_graph bg-teal-800 mx-4">

            <div className="row x_title">
              <div className="col-md-6">
                <CardsTitle title={title1} />
              </div>
            </div>
            <div className="row bg-amber-500 p-1 rounded"></div>
            <div className="clearfix"></div>
          </div>
        </div>
        <CardsSection />
        <MobileCardsSection1 />
        <MobileCardsSection2 />
        <div className="col-md-12 col-sm-12 col-xs-12 bg-teal-800 text-white">
          <div className="dashboard_graph bg-teal-800 mx-4">

            <div className="row x_title">
              <div className="col-md-6">
                <CardsTitle title={title2} />
              </div>
            </div>
            <div className="row bg-amber-500 p-1 rounded"></div>
            <div className="clearfix"></div>
          </div>
        </div>
        <CardsSection />
        <MobileCardsSection1 />
        <MobileCardsSection2 />
        <div className="col-md-12 col-sm-12 col-xs-12 bg-teal-800 text-white">
          <div className="dashboard_graph bg-teal-800 mx-4">

            <div className="row x_title">
              <div className="col-md-6">
                <CardsTitle title={title3} />
              </div>
            </div>
            <div className="row bg-amber-500 p-1 rounded"></div>
            <div className="clearfix"></div>
          </div>
        </div>
        <CardsSection />
        <MobileCardsSection1 />
        <MobileCardsSection2 />
      </div>
    </ClientLayout>
  )
}
