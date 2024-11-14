import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContext } from "./hooks/useAuth";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Member } from "./util/Types";

// Create a client
export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Root = () => {
  const [member, setMember] = React.useState<Member | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ member, loading, setMember, setLoading }}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
