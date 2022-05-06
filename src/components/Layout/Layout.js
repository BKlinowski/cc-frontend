import NavigationItems from "../Navigation/NavigationItems/NavigationItems"
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <div className={classes.Layout}>
        <NavigationItems />
        <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
