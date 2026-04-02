import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Language = "hi" | "en";

interface AppUser {
  name: string;
  email: string;
  phone?: string;
  classOrBranch?: string;
  language?: string;
  role?: string;
}

const BADGE_LIST = [
  "First Login",
  "Quiz Master",
  "7-Day Streak",
  "AI Explorer",
  "Perfect Score",
  "Study Champion",
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "Arjun Sharma", xp: 4200 },
  { rank: 2, name: "Priya Verma", xp: 3850 },
  { rank: 3, name: "Rahul Kumar", xp: 3400 },
  { rank: 4, name: "Sneha Singh", xp: 3100 },
  { rank: 5, name: "Amit Yadav", xp: 2900 },
  { rank: 6, name: "Pooja Gupta", xp: 2650 },
  { rank: 7, name: "Vikram Patel", xp: 2400 },
  { rank: 8, name: "Ananya Roy", xp: 2100 },
  { rank: 9, name: "Rohan Mishra", xp: 1850 },
  { rank: 10, name: "Kavita Tiwari", xp: 1600 },
];

export { BADGE_LIST };

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (hi: string, en: string) => string;
  currentUser: AppUser | null;
  setCurrentUser: (user: AppUser | null) => void;
  isLoggedIn: boolean;
  xpPoints: number;
  badges: string[];
  addXP: (points: number) => void;
  earnBadge: (badge: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("gyan-tarang-lang");
    return (saved as Language) || "hi";
  });

  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem("gyan-tarang-user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [xpPoints, setXpPoints] = useState<number>(() => {
    const saved = localStorage.getItem("gyan-tarang-xp");
    return saved ? Number(saved) : 0;
  });

  const [badges, setBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem("gyan-tarang-badges");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("gyan-tarang-lang", lang);
  };

  const setCurrentUserAndPersist = (user: AppUser | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("gyan-tarang-user", JSON.stringify(user));
      // First login badge
      setBadges((prev) => {
        if (!prev.includes("First Login")) {
          const next = [...prev, "First Login"];
          localStorage.setItem("gyan-tarang-badges", JSON.stringify(next));
          return next;
        }
        return prev;
      });
    } else {
      localStorage.removeItem("gyan-tarang-user");
    }
  };

  const addXP = (points: number) => {
    setXpPoints((prev) => {
      const next = prev + points;
      localStorage.setItem("gyan-tarang-xp", String(next));
      return next;
    });
  };

  const earnBadge = (badge: string) => {
    setBadges((prev) => {
      if (!prev.includes(badge)) {
        const next = [...prev, badge];
        localStorage.setItem("gyan-tarang-badges", JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  const t = (hi: string, en: string) => (language === "hi" ? hi : en);

  useEffect(() => {
    localStorage.setItem("gyan-tarang-lang", language);
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        setCurrentUser: setCurrentUserAndPersist,
        isLoggedIn: !!currentUser,
        xpPoints,
        badges,
        addXP,
        earnBadge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
