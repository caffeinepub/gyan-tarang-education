import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  AlertCircle,
  Brain,
  CheckCircle,
  ChevronRight,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Difficulty = "basic" | "intermediate" | "advanced";
type Topic = keyof typeof problemBank;

const problemBank = {
  Arithmetic: {
    basic: [
      {
        q: "√144 का मान क्या है? / What is √144?",
        options: ["10", "11", "12", "13"],
        answer: 2,
        solution: "144 = 12 × 12, इसलिए √144 = 12\n144 = 12 × 12, so √144 = 12",
      },
      {
        q: "15 का 20% क्या है? / What is 20% of 15?",
        options: ["2", "3", "4", "5"],
        answer: 1,
        solution: "20% of 15 = (20/100) × 15 = 3",
      },
      {
        q: "LCM of 4 and 6?",
        options: ["8", "12", "16", "24"],
        answer: 1,
        solution: "4 = 2², 6 = 2×3\nLCM = 2² × 3 = 12",
      },
    ],
    intermediate: [
      {
        q: "A can do work in 10 days, B in 15 days. Together?",
        options: ["5 days", "6 days", "7 days", "8 days"],
        answer: 1,
        solution:
          "A's rate = 1/10, B's rate = 1/15\nTogether = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6\nTime = 6 days",
      },
      {
        q: "A train 100m long at 60 km/h crosses a 200m bridge. Time?",
        options: ["15s", "18s", "20s", "12s"],
        answer: 1,
        solution:
          "Total distance = 100 + 200 = 300m\nSpeed = 60 km/h = 60×1000/3600 = 50/3 m/s\nTime = 300 ÷ (50/3) = 300 × 3/50 = 18 seconds",
      },
    ],
    advanced: [
      {
        q: "If x + 1/x = 5, find x² + 1/x²?",
        options: ["23", "25", "27", "21"],
        answer: 0,
        solution: "(x + 1/x)² = x² + 2 + 1/x² = 25\nSo x² + 1/x² = 25 - 2 = 23",
      },
    ],
  },
  Algebra: {
    basic: [
      {
        q: "2x + 5 = 13 mein x = ?",
        options: ["3", "4", "5", "6"],
        answer: 1,
        solution: "2x = 13 - 5 = 8\nx = 8/2 = 4",
      },
      {
        q: "(a+b)² का expansion?",
        options: ["a²+b²", "a²+2ab+b²", "a²-2ab+b²", "2a+2b"],
        answer: 1,
        solution:
          "(a+b)² = a² + 2ab + b²\nYaad rakhein: square + 2×product + square",
      },
    ],
    intermediate: [
      {
        q: "If 2x - 3y = 7 and x + y = 6, find x?",
        options: ["4", "5", "3", "6"],
        answer: 1,
        solution:
          "From x + y = 6: y = 6 - x\n2x - 3(6-x) = 7\n2x - 18 + 3x = 7\n5x = 25\nx = 5",
      },
    ],
    advanced: [
      {
        q: "Roots of x² - 5x + 6 = 0?",
        options: ["2, 3", "1, 6", "2, 4", "3, 4"],
        answer: 0,
        solution:
          "x² - 5x + 6 = 0\n(x-2)(x-3) = 0\nx = 2 or x = 3\nVerify: 2+3=5 ✓, 2×3=6 ✓",
      },
    ],
  },
  Geometry: {
    basic: [
      {
        q: "एक वर्ग की भुजा 5 cm है। Area?",
        options: ["20 cm²", "25 cm²", "30 cm²", "15 cm²"],
        answer: 1,
        solution: "Area of square = side² = 5² = 25 cm²",
      },
      {
        q: "एक triangle की sides 3, 4, 5 हैं। यह क्या है?",
        options: ["Equilateral", "Isosceles", "Right triangle", "Obtuse"],
        answer: 2,
        solution:
          "3² + 4² = 9 + 16 = 25 = 5²\nPythagoras theorem satisfy होता है, तो यह Right triangle है",
      },
    ],
    intermediate: [
      {
        q: "Circle की radius 7 cm है। Area? (π=22/7)",
        options: ["154 cm²", "144 cm²", "134 cm²", "164 cm²"],
        answer: 0,
        solution: "Area = πr² = (22/7) × 7 × 7 = 22 × 7 = 154 cm²",
      },
    ],
    advanced: [
      {
        q: "In a triangle, if two angles are 60° and 70°, find third angle?",
        options: ["50°", "60°", "40°", "70°"],
        answer: 0,
        solution:
          "Sum of angles in triangle = 180°\nThird angle = 180° - 60° - 70° = 50°",
      },
    ],
  },
  Trigonometry: {
    basic: [
      {
        q: "sin 30° = ?",
        options: ["√3/2", "1/2", "1/√2", "1"],
        answer: 1,
        solution:
          "sin 30° = 1/2\nYaad rakhein: sin values: 0°=0, 30°=1/2, 45°=1/√2, 60°=√3/2, 90°=1",
      },
      {
        q: "cos 60° = ?",
        options: ["1/2", "√3/2", "1/√2", "√3"],
        answer: 0,
        solution:
          "cos 60° = 1/2\ncos values: 0°=1, 30°=√3/2, 45°=1/√2, 60°=1/2, 90°=0",
      },
    ],
    intermediate: [
      {
        q: "sin²θ + cos²θ = ?",
        options: ["0", "1", "2", "√2"],
        answer: 1,
        solution:
          "sin²θ + cos²θ = 1\nYeh Pythagorean identity hai - bahut important!",
      },
    ],
    advanced: [
      {
        q: "tan 45° + cot 45° = ?",
        options: ["2", "√2", "1", "0"],
        answer: 0,
        solution: "tan 45° = 1, cot 45° = 1\n1 + 1 = 2",
      },
    ],
  },
  Calculus: {
    basic: [
      {
        q: "d/dx(x³) = ?",
        options: ["x²", "3x²", "3x", "x³"],
        answer: 1,
        solution: "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹\nd/dx(x³) = 3x³⁻¹ = 3x²",
      },
    ],
    intermediate: [
      {
        q: "∫2x dx = ?",
        options: ["x² + C", "2x² + C", "x + C", "x³/3 + C"],
        answer: 0,
        solution:
          "∫2x dx = 2·(x²/2) + C = x² + C\nPower rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
      },
    ],
    advanced: [
      {
        q: "Derivative of sin(x) is?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        answer: 0,
        solution: "d/dx(sin x) = cos x\nd/dx(cos x) = -sin x - yaad rakhein!",
      },
    ],
  },
  Statistics: {
    basic: [
      {
        q: "Mean of 2, 4, 6, 8, 10?",
        options: ["5", "6", "7", "4"],
        answer: 1,
        solution: "Mean = (2+4+6+8+10)/5 = 30/5 = 6",
      },
      {
        q: "Median of 1, 3, 5, 7, 9?",
        options: ["3", "5", "7", "9"],
        answer: 1,
        solution:
          "Median = middle value\nData arranged: 1, 3, 5, 7, 9\nMiddle (3rd) value = 5",
      },
    ],
    intermediate: [
      {
        q: "Mode of 2, 3, 4, 4, 5, 5, 5, 6?",
        options: ["4", "5", "6", "3"],
        answer: 1,
        solution:
          "Mode = most frequent value\n5 appears 3 times (maximum), so mode = 5",
      },
    ],
    advanced: [
      {
        q: "Standard deviation measures?",
        options: [
          "Average value",
          "Spread/dispersion",
          "Central value",
          "Frequency",
        ],
        answer: 1,
        solution:
          "Standard deviation measures how spread out values are from the mean. Lower SD = more consistent data.",
      },
    ],
  },
};

const topics = Object.keys(problemBank) as Topic[];

export default function MathsTutorPage() {
  const { t } = useAppContext();
  const [topic, setTopic] = useState<Topic>("Arithmetic");
  const [difficulty, setDifficulty] = useState<Difficulty>("basic");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const problems = problemBank[topic]?.[difficulty] || [];
  const current = problems[currentIdx];

  const handleAnswer = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    setTotalAnswered((prev) => prev + 1);
    if (optIdx === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % problems.length);
    setSelectedOption(null);
    setShowSolution(false);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowSolution(false);
    setScore(0);
    setTotalAnswered(0);
  };

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
              <Brain
                className="h-8 w-8"
                style={{ color: "oklch(0.76 0.12 350)" }}
              />
              <h1 className="font-display text-3xl font-black text-foreground">
                {t("AI Maths Tutor", "AI Maths Tutor")}
              </h1>
            </div>
            <p className="text-foreground/70">
              {t(
                "Basic से Advanced तक - Step-by-step solutions के साथ Mathematics practice",
                "From Basic to Advanced - Mathematics practice with step-by-step solutions",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Sidebar */}
          <div className="space-y-4">
            <Card className="border border-border/50">
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Topic
                  </p>
                  <div className="space-y-1">
                    {topics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          setTopic(t);
                          setCurrentIdx(0);
                          setSelectedOption(null);
                          setShowSolution(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          topic === t
                            ? "text-white font-semibold"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                        style={
                          topic === t
                            ? { background: "oklch(0.76 0.12 350)" }
                            : {}
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Difficulty
                  </p>
                  <div className="space-y-1">
                    {(
                      ["basic", "intermediate", "advanced"] as Difficulty[]
                    ).map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => {
                          setDifficulty(d);
                          setCurrentIdx(0);
                          setSelectedOption(null);
                          setShowSolution(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                          difficulty === d
                            ? "text-white font-semibold"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                        style={
                          difficulty === d
                            ? {
                                background:
                                  d === "basic"
                                    ? "oklch(0.65 0.22 340)"
                                    : d === "intermediate"
                                      ? "oklch(0.76 0.12 350)"
                                      : "oklch(0.62 0.28 340)",
                              }
                            : {}
                        }
                      >
                        {d === "basic"
                          ? "Basic"
                          : d === "intermediate"
                            ? "Intermediate"
                            : "Advanced"}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score */}
            <Card className="border border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp
                    className="h-4 w-4"
                    style={{ color: "oklch(0.65 0.22 340)" }}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    Progress
                  </span>
                </div>
                <div className="text-2xl font-display font-black text-foreground mb-1">
                  {score}/{totalAnswered}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Correct answers
                </div>
                <Progress
                  value={totalAnswered > 0 ? (score / totalAnswered) * 100 : 0}
                  className="h-2"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-3 gap-2 text-xs"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Problem Area */}
          <div className="lg:col-span-3">
            {current ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${topic}-${difficulty}-${currentIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-border/50">
                    <CardHeader
                      className="pb-4"
                      style={{ background: "oklch(0.18 0.10 260 / 0.04)" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            style={{
                              background: "oklch(0.76 0.12 350)",
                              color: "white",
                            }}
                          >
                            {topic}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {difficulty}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {currentIdx + 1} / {problems.length}
                        </span>
                      </div>
                      <Progress
                        value={((currentIdx + 1) / problems.length) * 100}
                        className="h-1"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div
                        className="p-5 rounded-xl mb-6 border"
                        style={{
                          background: "oklch(0.78 0.18 348 / 0.15)",
                          borderColor: "oklch(0.78 0.18 348 / 0.25)",
                        }}
                      >
                        <p className="font-display font-bold text-lg text-foreground leading-relaxed">
                          {current.q}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {current.options.map((opt, idx) => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => handleAnswer(idx)}
                            disabled={selectedOption !== null}
                            className={`p-4 rounded-xl border text-left font-medium transition-all ${
                              selectedOption === null
                                ? "hover:border-saffron/50 hover:bg-saffron/5 cursor-pointer"
                                : selectedOption !== null &&
                                    idx === current.answer
                                  ? "border-india-green bg-india-green/10 text-foreground"
                                  : selectedOption === idx &&
                                      idx !== current.answer
                                    ? "border-destructive bg-destructive/10 text-foreground"
                                    : "opacity-50"
                            }`}
                            style={{
                              borderColor:
                                selectedOption === null
                                  ? "oklch(0.88 0.02 260)"
                                  : idx === current.answer
                                    ? "oklch(0.65 0.22 340)"
                                    : selectedOption === idx
                                      ? "oklch(0.57 0.25 27)"
                                      : undefined,
                            }}
                          >
                            <span className="inline-flex items-center gap-3">
                              <span
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                style={{
                                  background:
                                    selectedOption !== null &&
                                    idx === current.answer
                                      ? "oklch(0.65 0.22 340)"
                                      : "oklch(0.88 0.02 260)",
                                  color:
                                    selectedOption !== null &&
                                    idx === current.answer
                                      ? "white"
                                      : "inherit",
                                }}
                              >
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {opt}
                              {selectedOption !== null &&
                                idx === current.answer && (
                                  <CheckCircle
                                    className="h-4 w-4 ml-auto"
                                    style={{ color: "oklch(0.65 0.22 340)" }}
                                  />
                                )}
                              {selectedOption === idx &&
                                idx !== current.answer && (
                                  <AlertCircle className="h-4 w-4 ml-auto text-destructive" />
                                )}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Solution Reveal */}
                      {selectedOption !== null && (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3"
                          >
                            {!showSolution ? (
                              <Button
                                variant="outline"
                                className="w-full gap-2"
                                onClick={() => setShowSolution(true)}
                              >
                                <Brain className="h-4 w-4" />
                                {t("Solution देखें", "Show Solution")}
                              </Button>
                            ) : (
                              <div
                                className="p-4 rounded-xl border"
                                style={{
                                  background: "oklch(0.78 0.18 348 / 0.15)",
                                  borderColor: "oklch(0.78 0.18 348 / 0.3)",
                                }}
                              >
                                <p className="text-sm font-semibold text-foreground mb-2">
                                  📝 Step-by-Step Solution:
                                </p>
                                <pre className="text-sm text-foreground/80 whitespace-pre-wrap font-body">
                                  {current.solution}
                                </pre>
                              </div>
                            )}

                            <Button
                              className="w-full gap-2 bg-saffron hover:bg-saffron/90 text-foreground"
                              onClick={handleNext}
                              data-ocid="maths.button"
                            >
                              {t("अगली Problem", "Next Problem")}
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            ) : (
              <Card className="border border-border/50">
                <CardContent className="p-12 text-center">
                  <Brain className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Topic aur difficulty select karein
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
