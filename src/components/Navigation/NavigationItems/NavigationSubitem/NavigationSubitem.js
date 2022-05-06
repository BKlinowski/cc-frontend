import React from "react";
import styles from "./NavigationSubitem.module.css";

const navigationSubitem = (props) => {
  return (
    <li className={styles.NavigationSubitem}>
      {/* <NavLink to={props.link} activeClassName={styles.active} className={styles.Text}> */}
      {props.text}
      {/* </NavLink> */}
    </li>
  );
};

export default navigationSubitem;
