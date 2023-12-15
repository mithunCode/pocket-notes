import Groups from "../../components/Groups";
import mainBg from "../../assets/mainBg.png";
import lock from "../../assets/lock.png";

import "./homepage.css";
const Homepage = () => {
  return (
    <section className="main-container">
      <section className="home-left">
        <Groups />
      </section>
      <section className="home-right">
        <img src={mainBg} alt="homepage" width={500} />
        <h2 className="title">Pocket Notes</h2>
        <p className="title-desc">
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
        <div className="encrpytion">
          <img src={lock} alt="" height={21} width={17} />
          <p>end-to-end encrypted</p>
        </div>
      </section>
    </section>
  );
};

export default Homepage;
