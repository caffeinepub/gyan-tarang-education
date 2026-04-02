import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const classOptions = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 (Science)",
  "Class 11 (Commerce)",
  "Class 11 (Arts)",
  "Class 12 (Science)",
  "Class 12 (Commerce)",
  "Class 12 (Arts)",
  "BTech CSE",
  "BTech ECE",
  "BTech ME",
  "BTech CE",
  "BTech EE",
  "BTech IT",
  "BTech Chemical",
  "BTech Civil",
  "BTech Aerospace",
  "Other",
];

// Floating particles for background
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.round((i * 17 + 5) % 95),
  y: Math.round((i * 23 + 10) % 90),
  size: [8, 12, 6, 10, 14][i % 5],
  color:
    i % 2 === 0 ? "oklch(0.72 0.18 55 / 0.25)" : "oklch(0.56 0.18 145 / 0.20)",
  duration: 3 + (i % 4),
  delay: i * 0.3,
}));

export default function AuthPage() {
  const { t, setCurrentUser } = useAppContext();
  const navigate = useNavigate();

  // Login tabs
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "google">(
    "email",
  );

  // Email/Password login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Phone login
  const [loginPhone, setLoginPhone] = useState("");
  const [phoneLoginLoading, setPhoneLoginLoading] = useState(false);

  // Google login
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleDialogOpen, setGoogleDialogOpen] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupClass, setSignupClass] = useState("");
  const [signupLang, setSignupLang] = useState("hi");
  const [showSignupPass, setShowSignupPass] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupVerifyMethod, setSignupVerifyMethod] = useState<
    "email" | "phone"
  >("email");

  // OTP state
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpContext, setOtpContext] = useState<"signup" | "phone-login">(
    "signup",
  );
  const [pendingUser, setPendingUser] = useState<{
    name: string;
    email: string;
    phone: string;
    classOrBranch: string;
    language: string;
  } | null>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  // Email/Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Kripya email aur password daalein");
      return;
    }
    if (!validateEmail(loginEmail)) {
      toast.error("Valid email address daalein");
      return;
    }
    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const storedUser = localStorage.getItem(`gt_user_${loginEmail}`);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === loginPassword) {
        setCurrentUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          classOrBranch: userData.classOrBranch,
          language: userData.language,
          role: userData.role || "user",
        });
        toast.success(`Namaste ${userData.name}! 🙏 Welcome back!`);
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Password galat hai. Dobara try karein.");
      }
    } else {
      setCurrentUser({
        name: "Student",
        email: loginEmail,
        role: "user",
      });
      toast.success("Login successful! 🎉");
      navigate({ to: "/dashboard" });
    }
    setLoginLoading(false);
  };

  // Phone OTP Login
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(loginPhone)) {
      toast.error("Valid 10-digit phone number daalein (6-9 se shuru)");
      return;
    }
    setPhoneLoginLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setOtpContext("phone-login");
    setOtpValues(["", "", "", "", "", ""]);
    setOtpOpen(true);
    setPhoneLoginLoading(false);
    toast.info(`📱 OTP bheja gaya: +91-${loginPhone} par`);
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setGoogleDialogOpen(true);
    await new Promise((r) => setTimeout(r, 1800));
    setGoogleDialogOpen(false);
    setGoogleLoading(false);
    setCurrentUser({
      name: "Google User",
      email: "google@gmail.com",
      role: "user",
    });
    toast.success("Google se login successful! 🎉");
    navigate({ to: "/dashboard" });
  };

  // Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      toast.error("Naam daalein");
      return;
    }
    if (!validateEmail(signupEmail)) {
      toast.error("Valid email daalein");
      return;
    }
    if (!validatePhone(signupPhone)) {
      toast.error("Valid 10-digit phone number daalein (Required)");
      return;
    }
    if (signupPassword.length < 8) {
      toast.error("Password kam se kam 8 characters ka hona chahiye");
      return;
    }
    if (!signupClass) {
      toast.error("Apni class/branch select karein");
      return;
    }

    setSignupLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setPendingUser({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      classOrBranch: signupClass,
      language: signupLang,
    });
    setOtpContext("signup");
    setOtpValues(["", "", "", "", "", ""]);
    setOtpOpen(true);
    setSignupLoading(false);
    if (signupVerifyMethod === "phone") {
      toast.info(`📱 Phone OTP bheja gaya: +91-${signupPhone} par`);
    } else {
      toast.info(`📧 Email OTP bheja gaya: ${signupEmail} par`);
    }
  };

  // OTP input handlers
  const handleOtpChange = (index: number, rawValue: string) => {
    const value = rawValue.length > 1 ? rawValue.slice(-1) : rawValue;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    if (otp.length < 6) {
      toast.error("6-digit OTP daalein");
      return;
    }
    setOtpVerifying(true);
    await new Promise((r) => setTimeout(r, 1000));

    if (otpContext === "phone-login") {
      setCurrentUser({
        name: "Student",
        phone: loginPhone,
        email: `${loginPhone}@phone.gt`,
        role: "user",
      });
      toast.success("🎉 Phone login successful! Welcome!");
      setOtpOpen(false);
      navigate({ to: "/dashboard" });
    } else if (pendingUser) {
      localStorage.setItem(
        `gt_user_${pendingUser.email}`,
        JSON.stringify({
          ...pendingUser,
          password: signupPassword,
          role: "user",
        }),
      );
      setCurrentUser({
        name: pendingUser.name,
        email: pendingUser.email,
        phone: pendingUser.phone,
        classOrBranch: pendingUser.classOrBranch,
        language: pendingUser.language,
        role: "user",
      });
      toast.success(`🎉 Verify ho gaya! Namaste ${pendingUser.name}!`);
      setOtpOpen(false);
      navigate({ to: "/dashboard" });
    }
    setOtpVerifying(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.62 0.28 340) 0%, oklch(0.65 0.25 340) 60%, oklch(0.68 0.22 345) 100%)",
      }}
    >
      {/* Animated floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Large glowing blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: "oklch(0.76 0.12 350)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: "oklch(0.65 0.22 340)" }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-48 h-48 rounded-full blur-2xl opacity-15"
          style={{ background: "oklch(0.76 0.12 350)" }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo + Brand Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative inline-block mb-3"
          >
            <img
              src="/assets/generated/gyan-tarang-logo-transparent.dim_400x400.png"
              alt="Gyan Tarang"
              className="h-20 w-20 mx-auto object-contain"
              style={{ boxShadow: "0 0 40px oklch(0.72 0.18 55 / 0.5)" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sibling = e.currentTarget
                  .nextElementSibling as HTMLElement | null;
                if (sibling) sibling.style.display = "flex";
              }}
            />
            <div
              style={{
                display: "none",
                background: "oklch(0.76 0.12 350)",
                boxShadow: "0 0 40px oklch(0.72 0.18 55 / 0.5)",
              }}
              className="h-20 w-20 mx-auto rounded-full items-center justify-center text-foreground font-black text-2xl font-display"
            >
              GT
            </div>
          </motion.div>
          <h1 className="font-display text-2xl font-black text-foreground">
            Gyan Tarang
          </h1>
          <p className="text-foreground/60 text-sm mt-1 font-display">
            नहीं आता है? सीखो!
          </p>
          <div className="flex justify-center gap-2 mt-2 flex-wrap">
            <span className="badge-made-in-india text-[10px]">
              🇮🇳 Made in India
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-card/10 text-foreground/70">
              <Shield className="h-2.5 w-2.5" /> Fully Secure
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-card/10 text-foreground/70">
              🎓 UGC Approved
            </span>
          </div>
        </div>

        {/* Main Card - Glassmorphism */}
        <Card
          className="border-0 shadow-2xl overflow-hidden"
          style={{
            background: "oklch(0.99 0 0 / 0.97)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 25px 60px oklch(0.55 0.24 340 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.1)",
          }}
        >
          {/* Top tricolor accent */}
          <div className="tricolor-bar" />
          <CardContent className="p-6">
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login" data-ocid="auth.login.tab">
                  {t("Login", "Login")}
                </TabsTrigger>
                <TabsTrigger value="signup" data-ocid="auth.signup.tab">
                  {t("Sign Up", "Sign Up")}
                </TabsTrigger>
              </TabsList>

              {/* ===== LOGIN TAB ===== */}
              <TabsContent value="login">
                {/* Login Method Selector */}
                <div className="flex gap-1.5 mb-5 p-1 rounded-xl bg-muted/60">
                  {(["email", "phone", "google"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setLoginMethod(method)}
                      className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all"
                      style={
                        loginMethod === method
                          ? {
                              background: "oklch(0.62 0.28 340)",
                              color: "white",
                              boxShadow: "0 2px 8px oklch(0.75 0.20 348 / 0.4)",
                            }
                          : { color: "oklch(0.99 0 0 / 0.7)" }
                      }
                      data-ocid={`auth.login.${method}.tab`}
                    >
                      {method === "email" && "📧 Email"}
                      {method === "phone" && "📱 Phone OTP"}
                      {method === "google" && "🔍 Google"}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* Email/Password Login */}
                  {loginMethod === "email" && (
                    <motion.form
                      key="email-login"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLogin}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="login-email">
                          {t("Email", "Email")}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-9"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            data-ocid="auth.email.input"
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">
                          {t("Password", "Password")}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type={showLoginPass ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-9 pr-9"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            data-ocid="auth.password.input"
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowLoginPass(!showLoginPass)}
                          >
                            {showLoginPass ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={loginLoading}
                        data-ocid="auth.submit_button"
                        style={{
                          background: "oklch(0.76 0.12 350)",
                          color: "white",
                        }}
                      >
                        {loginLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          t("Login करें", "Login")
                        )}
                      </Button>
                    </motion.form>
                  )}

                  {/* Phone OTP Login */}
                  {loginMethod === "phone" && (
                    <motion.form
                      key="phone-login"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handlePhoneLogin}
                      className="space-y-4"
                    >
                      <div
                        className="p-3 rounded-xl flex items-start gap-2 text-xs"
                        style={{
                          background: "oklch(0.75 0.20 348 / 0.15)",
                          borderColor: "oklch(0.72 0.18 55 / 0.25)",
                          border: "1px solid",
                          color: "oklch(0.99 0 0)",
                        }}
                      >
                        <Smartphone className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>
                          {t(
                            "अपना 10-digit mobile number दालें। OTP आपके phone पर भेजा जाएगा।",
                            "Enter your 10-digit mobile number. OTP will be sent to your phone.",
                          )}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-phone">
                          {t("Phone Number", "Phone Number")}
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                            +91
                          </span>
                          <Input
                            id="login-phone"
                            type="tel"
                            placeholder="9876543210"
                            className="pl-12"
                            value={loginPhone}
                            onChange={(e) =>
                              setLoginPhone(
                                e.target.value.replace(/\D/g, "").slice(0, 10),
                              )
                            }
                            data-ocid="auth.phone.input"
                            autoComplete="tel"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full font-semibold gap-2"
                        disabled={phoneLoginLoading}
                        data-ocid="auth.phone.submit_button"
                        style={{
                          background: "oklch(0.62 0.28 340)",
                          color: "white",
                        }}
                      >
                        {phoneLoginLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            OTP bhej raha hai...
                          </>
                        ) : (
                          <>
                            <Phone className="h-4 w-4" />
                            {t("OTP Bhejein", "Send OTP")}
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}

                  {/* Google Login */}
                  {loginMethod === "google" && (
                    <motion.div
                      key="google-login"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div
                        className="p-3 rounded-xl flex items-start gap-2 text-xs"
                        style={{
                          background: "oklch(0.56 0.18 145 / 0.07)",
                          border: "1px solid oklch(0.56 0.18 145 / 0.25)",
                          color: "oklch(0.99 0 0)",
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>
                          {t(
                            "Google account se instantly login karein। Secure और fast।",
                            "Login instantly with your Google account. Secure and fast.",
                          )}
                        </span>
                      </div>
                      <Button
                        type="button"
                        className="w-full gap-3 font-semibold h-12 text-sm"
                        style={{
                          background: "oklch(0.62 0.28 340)",
                          color: "#3c4043",
                          border: "1px solid #dadce0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        }}
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        data-ocid="auth.google.button"
                      >
                        {googleLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        ) : (
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        )}
                        {googleLoading
                          ? "Google se connect ho raha hai..."
                          : t("Google se Login करें", "Sign in with Google")}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* ===== SIGNUP TAB ===== */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">
                      {t("पूरा नाम", "Full Name")} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        placeholder={t("Apna naam daalein", "Enter your name")}
                        className="pl-9"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        data-ocid="auth.signup.name.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-9"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        data-ocid="auth.signup.email.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                        +91
                      </span>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="9876543210"
                        className="pl-12"
                        value={signupPhone}
                        onChange={(e) =>
                          setSignupPhone(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        data-ocid="auth.signup.phone.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showSignupPass ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        className="pl-9 pr-9"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        data-ocid="auth.signup.password.input"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowSignupPass(!showSignupPass)}
                      >
                        {showSignupPass ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("Class / Branch", "Class / Branch")} *</Label>
                    <Select
                      onValueChange={setSignupClass}
                      data-ocid="auth.signup.class.select"
                    >
                      <SelectTrigger data-ocid="auth.signup.class.select">
                        <SelectValue
                          placeholder={t(
                            "Apni class ya branch select karein",
                            "Select your class or branch",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {classOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {t("Preferred Language", "Preferred Language")}
                    </Label>
                    <Select value={signupLang} onValueChange={setSignupLang}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi-en">
                          Hinglish (Hindi + English)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Verify Method Toggle */}
                  <div className="space-y-2">
                    <Label>{t("OTP Verify Method", "OTP Verify Method")}</Label>
                    <div className="flex gap-2">
                      {(["email", "phone"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setSignupVerifyMethod(m)}
                          className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all"
                          style={
                            signupVerifyMethod === m
                              ? {
                                  background: "oklch(0.78 0.16 348 / 0.2)",
                                  borderColor: "oklch(0.65 0.22 340)",
                                  color: "oklch(0.99 0 0)",
                                }
                              : {
                                  borderColor: "oklch(0.88 0.02 260)",
                                  color: "oklch(0.99 0 0 / 0.6)",
                                }
                          }
                          data-ocid={`auth.signup.verify.${m}.toggle`}
                        >
                          {m === "email" ? "📧 Email OTP" : "📱 Phone OTP"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-semibold"
                    disabled={signupLoading}
                    data-ocid="auth.submit_button"
                    style={{
                      background: "oklch(0.76 0.12 350)",
                      color: "white",
                    }}
                  >
                    {signupLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      t("Register करें & OTP Verify करें", "Register & Verify OTP")
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Register karne par aap hamari{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                      Privacy Policy
                    </span>{" "}
                    se agree karte hain
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer security note */}
        <div className="text-center mt-4 space-y-1">
          <p className="text-xs text-foreground/50">
            🔒 Secured by Gyan Tarang | Made in India | UGC Approved
          </p>
          <p className="text-[10px] text-foreground/30">
            End-to-end encrypted | 100% Free Forever
          </p>
        </div>
      </motion.div>

      {/* OTP Verification Dialog */}
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent className="max-w-sm" data-ocid="auth.dialog">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{
                  background:
                    otpContext === "phone-login"
                      ? "oklch(0.72 0.18 55 / 0.15)"
                      : "oklch(0.56 0.18 145 / 0.15)",
                }}
              >
                {otpContext === "phone-login" ? (
                  <Smartphone
                    className="h-7 w-7"
                    style={{ color: "oklch(0.76 0.12 350)" }}
                  />
                ) : (
                  <CheckCircle
                    className="h-7 w-7"
                    style={{ color: "oklch(0.65 0.22 340)" }}
                  />
                )}
              </div>
            </div>
            <DialogTitle className="text-center">
              {otpContext === "phone-login"
                ? t("Phone OTP Verify करें", "Verify Phone OTP")
                : signupVerifyMethod === "phone"
                  ? t("Phone OTP Verify करें", "Verify Phone OTP")
                  : t("Email Verify करें", "Verify Your Email")}
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              {otpContext === "phone-login"
                ? `OTP bheja gaya: +91-${loginPhone} par`
                : signupVerifyMethod === "phone"
                  ? `OTP bheja gaya: +91-${pendingUser?.phone} par`
                  : `OTP bheja gaya: ${pendingUser?.email} par`}
              <br />
              <span className="text-xs">6-digit OTP daalein</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="flex justify-center gap-2">
              {(["d1", "d2", "d3", "d4", "d5", "d6"] as const).map(
                (digit, idx) => (
                  <Input
                    key={digit}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpValues[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-12 text-center text-lg font-bold p-0"
                    data-ocid="auth.otp.input"
                    autoFocus={idx === 0}
                    style={
                      otpValues[idx]
                        ? {
                            borderColor: "oklch(0.65 0.22 340)",
                            background: "oklch(0.56 0.18 145 / 0.06)",
                          }
                        : {}
                    }
                  />
                ),
              )}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full font-semibold gap-2"
                onClick={handleVerifyOtp}
                disabled={otpVerifying}
                data-ocid="auth.confirm_button"
                style={{ background: "oklch(0.65 0.22 340)", color: "white" }}
              >
                {otpVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  t("✅ OTP Verify करें", "✅ Verify OTP")
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => {
                  setPendingUser(null);
                  setOtpOpen(false);
                }}
                data-ocid="auth.cancel_button"
              >
                {t("Cancel करें", "Cancel")}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              OTP nahi mila?{" "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => toast.info("OTP resend kiya gaya! 📱")}
              >
                Resend karein
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Google Connecting Dialog */}
      <Dialog open={googleDialogOpen} onOpenChange={() => {}}>
        <DialogContent
          className="max-w-xs text-center"
          data-ocid="auth.google.dialog"
        >
          <DialogHeader>
            <div className="flex justify-center mb-4 mt-2">
              <div className="relative h-16 w-16">
                <svg
                  className="h-16 w-16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
            <DialogTitle>Google se Connect ho raha hai...</DialogTitle>
            <DialogDescription>Kripya thoda intezaar karein</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
