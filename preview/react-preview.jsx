import React from "react";
import ReactDOM from "react-dom";
import { AzureMap, AzureMapsProvider } from '../dist/react-azure-maps.es6';

const option = {
  authOptions: {
    authType: "subscriptionKey",
    subscriptionKey: "",
  },
};

const DefaultMap= () => (
  <AzureMapsProvider>
    <div style={{ height: '300px' }}>
      <AzureMap options={option} />
    </div>
  </AzureMapsProvider>
);

export default DefaultMap;

ReactDOM.render(<DefaultMap />, document.getElementById("root"));
