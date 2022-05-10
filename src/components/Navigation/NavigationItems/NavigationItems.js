import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationSubitem from "./NavigationSubitem/NavigationSubitem";

const navigationItems = (props) => {
  return (
    <div className={styles.NavigationItems}>
      <div className={styles.Submenu}>
        <ul className={styles.Items}>
          <NavigationSubitem link="/generator" text="Generator" />
          <NavigationSubitem link="/actions" text="Actions" />
        </ul>
      </div>
    </div>
  );
};

export default navigationItems;
