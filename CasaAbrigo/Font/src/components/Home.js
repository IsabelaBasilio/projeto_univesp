import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className={styles["home-container"]}>
        <nav>
          <ul className={styles["button-list"]}>
            <li>
              <Link to="/pessoa" className={styles["button-link"]}>
                Pessoas
              </Link>
            </li>
            <li>
              <Link to="/cozinha" className={styles["button-link"]}>
                Cozinha
              </Link>
            </li>
            <li>
              <Link to="/quarto" className={styles["button-link"]}>
                Quartos
              </Link>
            </li>
            <li>
              <Link to="/casa" className={styles["button-link"]}>
                Casa
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;