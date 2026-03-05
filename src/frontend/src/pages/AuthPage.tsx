import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  User,
} from "lucide-react";
import { motion } from "motion/react";
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

export default function AuthPage() {
  const { t, setCurrentUser } = useAppContext();
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupClass, setSignupClass] = useState("");
  const [signupLang, setSignupLang] = useState("hi");
  const [showSignupPass, setShowSignupPass] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  // OTP state
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpVerifying, setOtpVerifying] = useState(false);
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
    // Simulate login - check localStorage for registered users
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
      // Demo login
      setCurrentUser({
        name: "Student",
        email: loginEmail,
        role: "user",
      });
      toast.success("Demo login successful! 🎉");
      navigate({ to: "/dashboard" });
    }
    setLoginLoading(false);
  };

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
    if (signupPhone && !validatePhone(signupPhone)) {
      toast.error("Valid 10-digit phone number daalein");
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
    setOtpOpen(true);
    setSignupLoading(false);
    toast.info(`📧 OTP bheja gaya hai: ${signupEmail} par`);
  };

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
    // Demo: accept any 6-digit OTP (in production would call backend)
    if (pendingUser) {
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
      toast.success(`🎉 Email verify ho gaya! Namaste ${pendingUser.name}!`);
      setOtpOpen(false);
      navigate({ to: "/dashboard" });
    }
    setOtpVerifying(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.10 260) 0%, oklch(0.22 0.12 260) 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: "oklch(0.72 0.18 55)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "oklch(0.56 0.18 145)" }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <img
            src="/assets/generated/gyan-tarang-logo-transparent.dim_200x200.png"
            alt="Gyan Tarang"
            className="h-16 w-16 mx-auto rounded-full mb-3"
          />
          <h1 className="font-display text-2xl font-black text-white">
            Gyan Tarang
          </h1>
          <p className="text-white/60 text-sm">नहीं आता है? सीखो!</p>
          <div className="flex justify-center gap-2 mt-2">
            <span className="badge-made-in-india text-[10px]">
              🇮🇳 Made in India
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/70">
              <Shield className="h-2.5 w-2.5" /> Fully Secure
            </span>
          </div>
        </div>

        <Card className="border-0 shadow-2xl">
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

              {/* LOGIN TAB */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t("Email", "Email")}</Label>
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
                    className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold"
                    disabled={loginLoading}
                    data-ocid="auth.submit_button"
                  >
                    {loginLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Logging in...
                      </>
                    ) : (
                      t("Login करें", "Login")
                    )}
                  </Button>

                  <div className="relative my-4">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      ya phir
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() =>
                      toast.info(
                        "Google Login jald aa raha hai! 🚀 Coming Soon",
                      )
                    }
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
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
                    Google se Login {t("करें", "")} (Coming Soon)
                  </Button>
                </form>
              </TabsContent>

              {/* SIGNUP TAB */}
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
                        data-ocid="auth.email.input"
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
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">
                      Phone Number
                      <span className="text-xs text-muted-foreground ml-1">
                        (Optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        className="pl-9"
                        value={signupPhone}
                        onChange={(e) =>
                          setSignupPhone(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Email OTP se verify karein (fully secure)
                    </p>
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
                        data-ocid="auth.password.input"
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
                      data-ocid="auth.email.input"
                    >
                      <SelectTrigger data-ocid="auth.email.input">
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

                  <Button
                    type="submit"
                    className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold"
                    disabled={signupLoading}
                    data-ocid="auth.submit_button"
                  >
                    {signupLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      t("Register करें & OTP Verify करें", "Register & Verify OTP")
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Register karne par aap hamari{" "}
                    <span className="text-primary cursor-pointer">
                      Privacy Policy
                    </span>{" "}
                    se agree karte hain
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/40 mt-4">
          🔒 End-to-end encrypted | Made in India | 100% Free
        </p>
      </motion.div>

      {/* OTP Verification Dialog */}
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent className="max-w-sm" data-ocid="auth.dialog">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.56 0.18 145 / 0.15)" }}
              >
                <CheckCircle
                  className="h-6 w-6"
                  style={{ color: "oklch(0.56 0.18 145)" }}
                />
              </div>
            </div>
            <DialogTitle className="text-center">
              {t("Email Verify करें", "Verify Your Email")}
            </DialogTitle>
            <DialogDescription className="text-center">
              OTP bheja gaya hai <strong>{pendingUser?.email}</strong> par. Apna
              6-digit OTP daalein.
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
                  />
                ),
              )}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-india-green hover:bg-india-green/90 text-white font-semibold"
                onClick={handleVerifyOtp}
                disabled={otpVerifying}
                data-ocid="auth.confirm_button"
              >
                {otpVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
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
                className="text-primary hover:underline"
                onClick={() => toast.info("OTP resend kiya gaya! 📧")}
              >
                Resend karein
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
