import React,{useState, useEffect} from 'react'
import UserSlider from '../../components/user/UserSlider.jsx'
import UserCategory from '../../components/user/UserCategory.jsx'
import Navbar from '../../components/user/Navbar.jsx'
import Footer from '../../components/user/Footer.jsx'
import BottomFooter from '../../components/user/BottomFooter.jsx'
import Sidebar from '../../components/user/Sidebar.jsx'
import TrustSection from '../../components/user/TrustSection.jsx'
import LatestCollection from '../../components/user/LatestCollection.jsx'
import UserHomeSkeleton from '../skeletons/UserHomeSkeleton.jsx'

const UserHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },0);
  }, []);

  if (loading) {
    return <UserHomeSkeleton />;
  }
  return (
    <div>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <UserSlider />

        <UserCategory />

        <TrustSection />

        <LatestCollection />


         <div className="hidden md:block">
        <Footer />
      </div>

      <div className="mt-8">
          <BottomFooter />

      </div>
    </div>
  )
}

export default UserHome;