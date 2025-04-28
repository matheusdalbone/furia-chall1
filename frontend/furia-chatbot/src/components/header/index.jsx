import React from "react";
import furiaLogo from "../../assets/furia-logo.svg";
import styles from "./style.module.css";

const Header = () => {
  return <>
    <header>
      <div className={ styles.logoSection }>
        <a href="https://furia.gg">
          <img src={ furiaLogo } alt="Logo da furia" />
        </a>
      </div>
    </header>
  </>
}

export default Header;