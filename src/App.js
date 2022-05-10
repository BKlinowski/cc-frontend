import Layout from "./components/Layout/Layout"
import { Route, Switch } from "react-router-dom"
import React, { Suspense } from "react"

const Actions = React.lazy(() => {
  return import("./components/Actions/Actions");
});

const Generator = React.lazy(() => {
  return import("./components/Generator/Generator");
});


function App() {
  let routes = (
    <Switch>
      <Route path="/Actions" render={(props) => <Actions {...props} />} />
      <Route path="/Generator" render={(props) => <Generator {...props} />} />
    </Switch>
  );
  return (
    <>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </>
  );
}

export default App;
