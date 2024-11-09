import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MemberClient from "./client/MemberClient";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./hooks/useAuth";
import AttendanceRecordPage from "./pages/AttendanceRecordPage";
import Error404 from "./pages/Error404";
import EventDetailsPage from "./pages/EventDetailsPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import UserPreference from "./pages/UserPreference";
import { JWTAuthToken } from "./util/Types";

function App() {
  const { member, loading, setMember, setLoading, setCheckedCookie } =
    useContext(AuthContext);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (loading || member) {
        return;
      }
      setLoading(true);
      if (cookies.token) {
        let decodedToken = jwtDecode<JWTAuthToken>(cookies.token);
        let memberResponse = await MemberClient.fetchMember(decodedToken.data);
        if (memberResponse.data) {
          setMember(memberResponse.data);
        } else {
          console.log("Error fetching member: ", memberResponse.error);
        }
      }
      setCheckedCookie(true);
      setLoading(false);
    };
    checkLoggedIn();
  }, [cookies.token, setMember, loading, setLoading, member]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Router>
        <div className={`${member?.id && " lg:flex lg:min-h-fit "}`}>
          {member?.id ? (
            <>
              <Menu />
              <div className="hidden lg:block lg:min-w-[19vw]"></div>
            </>
          ) : null}

          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
              errorElement={<Error404 />}
            />
            <Route element={<RequireAuth />}>
              <Route path="/events" element={<Homepage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/user/" element={<UserPreference />} />
              <Route path="/record" element={<AttendanceRecordPage />} />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
      {member?.id ? (
        <div className="lg:flex">
          {/* Used to take into account the always-visible side bar */}
          <div className="hidden lg:block lg:min-w-[19vw]"></div>
          <Footer hideInfo={false} />
        </div>
      ) : (
        <Footer hideInfo={true} />
      )}
    </div>
  );
}

export default App;
