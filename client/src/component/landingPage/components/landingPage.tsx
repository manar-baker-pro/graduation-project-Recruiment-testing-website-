import NavBar from "../../Navbar/components/NavbarCom";
import Services from "./Services";
import Steps from "./Steps";
import Footer from "./Footer";
import Video from "./Video";
import Start from "./Start";
import Header from "./header";
export default function LandingPage() {
  return (
    <div>
      <NavBar />
      <Header />
      <Services />
      <Steps />
      <Start />
      <Video />
      <Footer />
    </div>
  );
}
