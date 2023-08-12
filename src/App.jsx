import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorTest from "./components/ErrorTest";
import HotelsLayout from "./layouts/HotelsLayout";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import RatingPage from "./pages/RatingPage";
//ims
import royal from "./assets/Royal.png";
import four from "./assets/four season.png";
import holiday from "./assets/holiday.png";
{
  /* <Route index element={<HomePage />} />
<Route path="guest" element={<GuestPage />} />

<Route path="signup" element={<SignUp />} />
<Route path="*" element={<NotFound />} /> */
}
function App() {
  const getimg = (info) => {
    if (info.name === "Royal") {
      return royal;
    } else if (info.name === "four seasons") {
      return four;
    } else if (info.name === "Holiday beach") {
      return holiday;
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorTest />}>
        <Route index element={<LandingPage getimg={getimg} />} />
        <Route path="hotels" element={<HotelsLayout />}>
          <Route path=":id" element={<RatingPage getimg={getimg} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
export default App;
