import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
import { useSaveQuizScore } from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  RotateCcw,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const quizBank: Record<
  string,
  Record<string, { q: string; options: string[]; answer: number }[]>
> = {
  "Class 10": {
    Science: [
      {
        q: "Which gas is produced during photosynthesis?",
        options: ["CO2", "O2", "N2", "H2"],
        answer: 1,
      },
      {
        q: "Newton's first law is also called?",
        options: [
          "Law of Acceleration",
          "Law of Inertia",
          "Law of Action",
          "Law of Motion",
        ],
        answer: 1,
      },
      {
        q: "Chemical formula of water?",
        options: ["H2O2", "H2O", "HO", "H3O"],
        answer: 1,
      },
      {
        q: "The SI unit of force is?",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        answer: 2,
      },
      {
        q: "Which element is needed for blood clotting?",
        options: ["Iron", "Calcium", "Potassium", "Zinc"],
        answer: 1,
      },
      {
        q: "The human heart has how many chambers?",
        options: ["2", "3", "4", "5"],
        answer: 2,
      },
      { q: "pH of pure water?", options: ["6", "7", "8", "9"], answer: 1 },
      {
        q: "Which is NOT a renewable energy source?",
        options: ["Solar", "Wind", "Coal", "Hydro"],
        answer: 2,
      },
      {
        q: "Resistance unit?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 2,
      },
      {
        q: "Gene is made of?",
        options: ["Protein", "Carbohydrate", "DNA", "RNA"],
        answer: 2,
      },
    ],
    Mathematics: [
      {
        q: "Value of π (pi) approximately?",
        options: ["3.14", "3.41", "3.16", "3.12"],
        answer: 0,
      },
      {
        q: "Sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        answer: 1,
      },
      {
        q: "What is HCF of 12 and 18?",
        options: ["3", "4", "6", "9"],
        answer: 2,
      },
      {
        q: "Area of circle with r=7? (π=22/7)",
        options: ["144 cm²", "154 cm²", "164 cm²", "134 cm²"],
        answer: 1,
      },
      {
        q: "Roots of x²-5x+6=0?",
        options: ["2, 3", "1, 6", "2, 4", "3, 5"],
        answer: 0,
      },
      {
        q: "If sin A = 3/5, find cos A?",
        options: ["4/5", "3/4", "5/3", "5/4"],
        answer: 0,
      },
      {
        q: "Volume of cube with side 3cm?",
        options: ["9 cm³", "18 cm³", "27 cm³", "36 cm³"],
        answer: 2,
      },
      {
        q: "What is the median of 5,3,7,1,9?",
        options: ["3", "5", "7", "1"],
        answer: 1,
      },
      { q: "LCM of 4, 6, 8?", options: ["16", "24", "12", "48"], answer: 1 },
      {
        q: "Pythagoras: 3,4,? form right triangle",
        options: ["4", "5", "6", "7"],
        answer: 1,
      },
    ],
  },
  "Class 12": {
    Physics: [
      {
        q: "Speed of light in vacuum?",
        options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁷ m/s"],
        answer: 0,
      },
      {
        q: "Unit of electric charge?",
        options: ["Volt", "Ampere", "Coulomb", "Ohm"],
        answer: 2,
      },
      {
        q: "Which mirror is used in car headlights?",
        options: ["Plane", "Concave", "Convex", "Parabolic"],
        answer: 1,
      },
      {
        q: "Ohm's law: V = ?",
        options: ["I/R", "IR", "I+R", "I-R"],
        answer: 1,
      },
      {
        q: "SI unit of power?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        answer: 2,
      },
      {
        q: "Wavelength of visible light range?",
        options: ["100-400 nm", "400-700 nm", "700-1000 nm", "1000-1200 nm"],
        answer: 1,
      },
      {
        q: "Fleming's left hand rule is for?",
        options: [
          "Electric generators",
          "Electric motors",
          "Transformers",
          "Capacitors",
        ],
        answer: 1,
      },
      {
        q: "Nuclear fission releases energy based on?",
        options: ["E=mv²", "E=mc²", "E=mgh", "E=½mv²"],
        answer: 1,
      },
      {
        q: "Transistor is used as?",
        options: [
          "Switch only",
          "Amplifier only",
          "Switch and amplifier",
          "Rectifier",
        ],
        answer: 2,
      },
      {
        q: "In a transformer, which law applies?",
        options: [
          "Ohm's law",
          "Faraday's law",
          "Newton's law",
          "Coulomb's law",
        ],
        answer: 1,
      },
    ],
  },
  "General Knowledge": {
    "India GK": [
      {
        q: "India's capital?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: 1,
      },
      {
        q: "National bird of India?",
        options: ["Eagle", "Peacock", "Parrot", "Swan"],
        answer: 1,
      },
      {
        q: "India became independent in?",
        options: ["1945", "1946", "1947", "1948"],
        answer: 2,
      },
      {
        q: "Which river is called Ganga of South India?",
        options: ["Cauvery", "Krishna", "Godavari", "Mahanadi"],
        answer: 2,
      },
      {
        q: "India's currency?",
        options: ["Dollar", "Pound", "Rupee", "Euro"],
        answer: 2,
      },
      {
        q: "Founder of India's Constitution?",
        options: ["Gandhi", "Nehru", "Dr. Ambedkar", "Bose"],
        answer: 2,
      },
      {
        q: "India's national flower?",
        options: ["Rose", "Lotus", "Jasmine", "Marigold"],
        answer: 1,
      },
      {
        q: "Largest state of India by area?",
        options: ["Maharashtra", "UP", "Rajasthan", "MP"],
        answer: 2,
      },
      {
        q: "First President of India?",
        options: ["Nehru", "Gandhi", "Dr. Rajendra Prasad", "Patel"],
        answer: 2,
      },
      {
        q: "NEP 2020 was introduced under?",
        options: [
          "Finance Ministry",
          "Education Ministry",
          "Home Ministry",
          "IT Ministry",
        ],
        answer: 1,
      },
    ],
  },
};

const subjectMap: Record<string, string[]> = {
  "Class 10": ["Science", "Mathematics"],
  "Class 12": ["Physics"],
  "General Knowledge": ["India GK"],
};

type QuizState = "setup" | "active" | "result";

export default function QuizzesPage() {
  const { t } = useAppContext();
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedSubject, setSelectedSubject] = useState("Science");
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const { mutate: saveScore } = useSaveQuizScore();

  const questions = quizBank[selectedClass]?.[selectedSubject] || [];
  const totalQ = questions.length;

  const submitQuiz = useCallback(() => {
    setQuizState("result");
    const score = answers.filter((a, i) => a === questions[i]?.answer).length;
    saveScore(BigInt(score));
    toast.success(`Quiz completed! Score: ${score}/${totalQ} 🎉`);
  }, [answers, questions, saveScore, totalQ]);

  useEffect(() => {
    if (quizState !== "active") return;
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [quizState, timeLeft, submitQuiz]);

  const startQuiz = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setAnswers(new Array(totalQ).fill(null));
    setTimeLeft(600);
    setQuizState("active");
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ((p) => p + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const score = answers.filter((a, i) => a === questions[i]?.answer).length;
  const percentage = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="bg-hero-pattern py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap
                className="h-8 w-8"
                style={{ color: "oklch(0.76 0.12 350)" }}
              />
              <h1 className="font-display text-3xl font-black text-foreground">
                {t("Interactive Quizzes", "Interactive Quizzes")}
              </h1>
            </div>
            <p className="text-foreground/70">
              {t(
                "सभी subjects के MCQ quizzes - timer के साथ instant scoring",
                "MCQ quizzes for all subjects - instant scoring with timer",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          {quizState === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="font-display text-xl">
                    Quiz Configure Karein
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Class/Category
                      </p>
                      <Select
                        value={selectedClass}
                        onValueChange={(v) => {
                          setSelectedClass(v);
                          setSelectedSubject(subjectMap[v]?.[0] || "");
                        }}
                      >
                        <SelectTrigger data-ocid="quiz.select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(quizBank).map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Subject
                      </p>
                      <Select
                        value={selectedSubject}
                        onValueChange={setSelectedSubject}
                      >
                        <SelectTrigger data-ocid="quiz.select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(subjectMap[selectedClass] || []).map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { label: "Questions", value: `${totalQ} MCQ` },
                      { label: "Time Limit", value: "10 Minutes" },
                      { label: "Scoring", value: "Instant" },
                    ].map((info) => (
                      <div
                        key={info.label}
                        className="p-3 rounded-xl bg-muted/50"
                      >
                        <div className="font-display font-bold text-foreground">
                          {info.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {info.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl border border-saffron/20 bg-saffron/5 text-sm text-foreground/80">
                    <p className="font-semibold mb-1">📋 Instructions:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• {totalQ} MCQ questions honge</li>
                      <li>• Har question ka ek sahi jawab hai</li>
                      <li>• 10 minute mein finish karna hai</li>
                      <li>• End mein sahi answers dikhenge</li>
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-saffron hover:bg-saffron/90 text-foreground font-semibold py-5 gap-2"
                    onClick={startQuiz}
                    data-ocid="quiz.start.button"
                    disabled={totalQ === 0}
                  >
                    <Zap className="h-5 w-5" />
                    {t("Quiz Shuru Karein!", "Start Quiz!")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {quizState === "active" && (
            <motion.div
              key={`active-${currentQ}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Timer & Progress Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-muted-foreground">
                    Q {currentQ + 1} / {totalQ}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${
                    timeLeft < 60
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </div>
              </div>

              <Progress
                value={((currentQ + 1) / totalQ) * 100}
                className="h-2 mb-6"
              />

              <Card className="border border-border/50">
                <CardContent className="p-6">
                  <div
                    className="p-5 rounded-xl mb-6 border"
                    style={{
                      background: "oklch(0.78 0.18 348 / 0.15)",
                      borderColor: "oklch(0.78 0.18 348 / 0.25)",
                    }}
                  >
                    <p className="font-display font-bold text-lg text-foreground">
                      {questions[currentQ]?.q}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {questions[currentQ]?.options.map((opt, idx) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleAnswer(idx)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                          selectedAnswer === null
                            ? "hover:border-saffron/50 hover:bg-saffron/5 cursor-pointer"
                            : idx === questions[currentQ].answer
                              ? "border-india-green bg-india-green/10"
                              : selectedAnswer === idx
                                ? "border-destructive bg-destructive/10"
                                : "opacity-50"
                        }`}
                        style={{
                          borderColor:
                            selectedAnswer !== null
                              ? idx === questions[currentQ].answer
                                ? "oklch(0.65 0.22 340)"
                                : selectedAnswer === idx
                                  ? "oklch(0.57 0.25 27)"
                                  : "oklch(0.88 0.02 260)"
                              : "oklch(0.88 0.02 260)",
                        }}
                        data-ocid="quiz.submit_button"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                          {selectedAnswer !== null &&
                            idx === questions[currentQ].answer && (
                              <CheckCircle
                                className="h-4 w-4 ml-auto"
                                style={{ color: "oklch(0.65 0.22 340)" }}
                              />
                            )}
                          {selectedAnswer === idx &&
                            idx !== questions[currentQ].answer && (
                              <AlertCircle className="h-4 w-4 ml-auto text-destructive" />
                            )}
                        </span>
                      </button>
                    ))}
                  </div>

                  {selectedAnswer !== null && (
                    <Button
                      className="w-full bg-saffron hover:bg-saffron/90 text-foreground font-semibold"
                      onClick={handleNext}
                    >
                      {currentQ < totalQ - 1
                        ? "Next Question →"
                        : "Submit Quiz ✓"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {quizState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              data-ocid="quiz.score.success_state"
            >
              <Card className="border border-border/50 overflow-hidden">
                <div
                  className="p-8 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.22 345), oklch(0.62 0.28 340))",
                  }}
                >
                  <Trophy
                    className="h-16 w-16 mx-auto mb-4"
                    style={{ color: "oklch(0.76 0.12 350)" }}
                  />
                  <h2 className="font-display text-3xl font-black text-foreground mb-2">
                    Quiz Completed!
                  </h2>
                  <div
                    className="text-6xl font-display font-black mb-2"
                    style={{
                      color:
                        percentage >= 70
                          ? "oklch(0.65 0.22 340)"
                          : "oklch(0.76 0.12 350)",
                    }}
                  >
                    {percentage}%
                  </div>
                  <p className="text-foreground/70">
                    {score} out of {totalQ} correct
                  </p>
                </div>
                <CardContent className="p-6 space-y-4">
                  {/* Answer Review */}
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-3">
                      Answer Review:
                    </h3>
                    <div className="space-y-2">
                      {questions.map((q, idx) => (
                        <div
                          key={q.q}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                        >
                          <span
                            className={`text-sm font-bold shrink-0 mt-0.5 ${answers[idx] === q.answer ? "text-india-green" : "text-destructive"}`}
                            style={{
                              color:
                                answers[idx] === q.answer
                                  ? "oklch(0.65 0.22 340)"
                                  : "oklch(0.57 0.25 27)",
                            }}
                          >
                            Q{idx + 1}
                          </span>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {q.q}
                            </p>
                            <p
                              className="text-xs font-semibold mt-0.5"
                              style={{ color: "oklch(0.65 0.22 340)" }}
                            >
                              ✓ {q.options[q.answer]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => setQuizState("setup")}
                    >
                      <RotateCcw className="h-4 w-4" />
                      New Quiz
                    </Button>
                    <Button
                      className="flex-1 gap-2 bg-saffron hover:bg-saffron/90 text-foreground"
                      onClick={startQuiz}
                    >
                      <Zap className="h-4 w-4" />
                      Same Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
