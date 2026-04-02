import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

import AICareerPage from "./pages/AICareerPage";
import AIPerformancePage from "./pages/AIPerformancePage";
import AIQuizGeneratorPage from "./pages/AIQuizGeneratorPage";
import AIStudyPlannerPage from "./pages/AIStudyPlannerPage";
import AISummarizerPage from "./pages/AISummarizerPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import BtechPage from "./pages/BtechPage";
import CompetitiveExamsPage from "./pages/CompetitiveExamsPage";
import DashboardPage from "./pages/DashboardPage";
import EnglishCoachPage from "./pages/EnglishCoachPage";
import GovernmentPage from "./pages/GovernmentPage";
import GyanMitraPage from "./pages/GyanMitraPage";
// Pages
import LandingPage from "./pages/LandingPage";
import MathsTutorPage from "./pages/MathsTutorPage";
import MockTestsPage from "./pages/MockTestsPage";
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

// Root Layout with motion page transition
const RootLayout = () => (
  <AppProvider>
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.99 0 0)" }}
    >
      <Navbar />
      <main className="flex-1">
        <motion.div
          key={
            typeof window !== "undefined" ? window.location.pathname : "root"
          }
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
    <Toaster richColors position="top-right" />
  </AppProvider>
);

const rootRoute = createRootRoute({
  component: RootLayout,
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
const gyanMitraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gyan-mitra",
  component: GyanMitraPage,
});
const mockTestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mock-tests",
  component: MockTestsPage,
});
const aiStudyPlannerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-study-planner",
  component: AIStudyPlannerPage,
});
const aiQuizGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-quiz-generator",
  component: AIQuizGeneratorPage,
});
const aiPerformanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-performance",
  component: AIPerformancePage,
});
const aiCareerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-career",
  component: AICareerPage,
});
const aiSummarizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-summarizer",
  component: AISummarizerPage,
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
  gyanMitraRoute,
  mockTestsRoute,
  aiStudyPlannerRoute,
  aiQuizGeneratorRoute,
  aiPerformanceRoute,
  aiCareerRoute,
  aiSummarizerRoute,
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
