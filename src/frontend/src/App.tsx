import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import BtechPage from "./pages/BtechPage";
import CompetitiveExamsPage from "./pages/CompetitiveExamsPage";
import DashboardPage from "./pages/DashboardPage";
import EnglishCoachPage from "./pages/EnglishCoachPage";
import GovernmentPage from "./pages/GovernmentPage";
// Pages
import LandingPage from "./pages/LandingPage";
import MathsTutorPage from "./pages/MathsTutorPage";
import NCERTPage from "./pages/NCERTPage";
import NdlPage from "./pages/NdlPage";
import NotesPage from "./pages/NotesPage";
import PlacementPage from "./pages/PlacementPage";
import PreviousYearPage from "./pages/PreviousYearPage";
import QuizzesPage from "./pages/QuizzesPage";
import StudyGroupsPage from "./pages/StudyGroupsPage";
import StudyTrackerPage from "./pages/StudyTrackerPage";
import VideoLecturesPage from "./pages/VideoLecturesPage";
import WellnessPage from "./pages/WellnessPage";

// Root Layout
const rootRoute = createRootRoute({
  component: () => (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </AppProvider>
  ),
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const authPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const ncertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ncert",
  component: NCERTPage,
});

const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/videos",
  component: VideoLecturesPage,
});

const competitiveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/competitive",
  component: CompetitiveExamsPage,
});

const placementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/placement",
  component: PlacementPage,
});

const mathsTutorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maths-tutor",
  component: MathsTutorPage,
});

const englishCoachRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/english-coach",
  component: EnglishCoachPage,
});

const quizzesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quizzes",
  component: QuizzesPage,
});

const studyGroupsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/study-groups",
  component: StudyGroupsPage,
});

const wellnessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wellness",
  component: WellnessPage,
});

const governmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/government",
  component: GovernmentPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notes",
  component: NotesPage,
});

const pyqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pyq",
  component: PreviousYearPage,
});

const btechRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/btech",
  component: BtechPage,
});

const studyTrackerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/study-tracker",
  component: StudyTrackerPage,
});

const ndlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ndl",
  component: NdlPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authPageRoute,
  dashboardRoute,
  ncertRoute,
  videosRoute,
  notesRoute,
  pyqRoute,
  btechRoute,
  competitiveRoute,
  placementRoute,
  mathsTutorRoute,
  englishCoachRoute,
  quizzesRoute,
  studyGroupsRoute,
  wellnessRoute,
  governmentRoute,
  adminRoute,
  aboutRoute,
  studyTrackerRoute,
  ndlRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
