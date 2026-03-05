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

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (hi: string, en: string) => string;
  currentUser: AppUser | null;
  setCurrentUser: (user: AppUser | null) => void;
  isLoggedIn: boolean;
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

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("gyan-tarang-lang", lang);
  };

  const setCurrentUserAndPersist = (user: AppUser | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("gyan-tarang-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("gyan-tarang-user");
    }
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
