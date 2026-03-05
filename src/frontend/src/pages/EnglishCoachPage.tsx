import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  ChevronRight,
  MessageSquare,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const grammarExercises = [
  {
    q: "Choose the correct form: She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    answer: 1,
    explanation:
      "'She' is third person singular, so use 'goes'. Rule: He/She/It + verb+s/es",
  },
  {
    q: "Which is correct?",
    options: [
      "I have ate breakfast.",
      "I have eaten breakfast.",
      "I has eaten breakfast.",
      "I eating breakfast.",
    ],
    answer: 1,
    explanation:
      "Present Perfect: have/has + past participle. 'eaten' is past participle of 'eat'",
  },
  {
    q: "Passive voice of 'The teacher teaches students'?",
    options: [
      "Students are taught by the teacher.",
      "Students were taught by teacher.",
      "Students taught by teacher.",
      "The teacher is taught.",
    ],
    answer: 0,
    explanation:
      "Active: Subject + Verb + Object → Passive: Object + is/are + past participle + by + Subject",
  },
  {
    q: "Choose correct sentence:",
    options: [
      "He don't like tea.",
      "He doesn't likes tea.",
      "He doesn't like tea.",
      "He not like tea.",
    ],
    answer: 2,
    explanation:
      "Negative: He/She/It + doesn't + base form of verb (without 's/es')",
  },
  {
    q: "___ you help me, please?",
    options: ["Will", "Would", "Can", "Both B and C"],
    answer: 3,
    explanation:
      "Both 'Would' and 'Can' are correct for polite requests. 'Could' is also acceptable.",
  },
];

const vocabularyWords = [
  {
    word: "Perseverance",
    meaning: "Continued effort despite difficulty or failure",
    hindi: "दृढ़ता / दृढ़ संकल्प",
    example: "His perseverance helped him succeed despite many failures.",
  },
  {
    word: "Diligent",
    meaning: "Showing care and effort in work",
    hindi: "परिश्रमी / मेहनती",
    example: "The diligent student completed all assignments on time.",
  },
  {
    word: "Eloquent",
    meaning: "Fluent and persuasive in speaking or writing",
    hindi: "वाक्पटु / सुवक्ता",
    example: "She gave an eloquent speech at the graduation ceremony.",
  },
  {
    word: "Benevolent",
    meaning: "Well-meaning and kindly",
    hindi: "परोपकारी / दयालु",
    example: "The benevolent teacher always helped struggling students.",
  },
  {
    word: "Ambiguous",
    meaning: "Open to more than one interpretation",
    hindi: "अस्पष्ट / द्विअर्थी",
    example: "The question was ambiguous and confusing for students.",
  },
  {
    word: "Pragmatic",
    meaning: "Dealing with things sensibly and practically",
    hindi: "व्यावहारिक",
    example: "We need a pragmatic approach to solve this problem.",
  },
];

const speakingTips = [
  {
    category: "Pronunciation",
    tips: [
      {
        tip: "Read aloud daily - 15 minutes rojana",
        detail: "NCERT English books padhein zyoor se",
      },
      {
        tip: "Mirror practice karo - apne aap se baat karo",
        detail: "Confidence develop karne ka sabse accha tarika",
      },
      {
        tip: "English news sunein - BBC/All India Radio",
        detail: "Natural pronunciation sunne mein madad milti hai",
      },
    ],
  },
  {
    category: "Spoken English",
    tips: [
      {
        tip: "Simple sentences se shuru karein",
        detail: "Subject + Verb + Object - basic structure",
      },
      {
        tip: "Think in English - Hindi mein sochna band karein",
        detail: "Direct translation ki aadat hatayein",
      },
      {
        tip: "English movies/TV shows English subtitles ke saath dekhein",
        detail: "Natural flow samajh mein aayegi",
      },
    ],
  },
  {
    category: "Common Phrases",
    phrases: [
      { phrase: "Could you please repeat that?", use: "Kuch samajh nahi aaya" },
      {
        phrase: "I'm afraid I don't understand.",
        use: "Politely kehna ki samajha nahi",
      },
      { phrase: "That's a great point.", use: "Kisi ki baat se agree karna" },
      { phrase: "Would you mind if...?", use: "Permission mangna" },
      { phrase: "As far as I know...", use: "Apni knowledge share karna" },
    ],
  },
];

const readingPassage = {
  title: "The Importance of Education (NCERT-inspired)",
  text: `Education is the most powerful tool that we can use to change the world. It is through education that we learn about our history, culture, science, and technology.

In India, the Right to Education Act ensures that every child between the ages of 6 to 14 years has the right to free and compulsory education. This was a landmark step in ensuring equal educational opportunities for all children.

The National Education Policy 2020 (NEP 2020) aims to transform India's education system. It focuses on holistic development of students - not just academic knowledge, but also skills, values, and character.`,
  questions: [
    {
      q: "What is education described as in the passage?",
      options: [
        "A business tool",
        "The most powerful tool to change the world",
        "A government policy",
        "A cultural activity",
      ],
      answer: 1,
    },
    {
      q: "What does the Right to Education Act ensure?",
      options: [
        "Free higher education",
        "Free and compulsory education for ages 6-14",
        "Education for all adults",
        "Free college education",
      ],
      answer: 1,
    },
    {
      q: "What does NEP 2020 focus on?",
      options: [
        "Only academic knowledge",
        "Sports and games",
        "Holistic development of students",
        "Technology only",
      ],
      answer: 2,
    },
  ],
};

export default function EnglishCoachPage() {
  const { t } = useAppContext();
  const [grammarIdx, setGrammarIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [vocabIdx, setVocabIdx] = useState(0);
  const [readingAnswers, setReadingAnswers] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);
  const [readingSubmitted, setReadingSubmitted] = useState(false);
  const [grammarScore, setGrammarScore] = useState(0);
  const [grammarTotal, setGrammarTotal] = useState(0);

  const currentGrammar = grammarExercises[grammarIdx];
  const currentVocab = vocabularyWords[vocabIdx];

  const handleGrammarAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setGrammarTotal((p) => p + 1);
    if (idx === currentGrammar.answer) setGrammarScore((p) => p + 1);
  };

  const handleNextGrammar = () => {
    setGrammarIdx((p) => (p + 1) % grammarExercises.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleReadingSubmit = () => {
    setReadingSubmitted(true);
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
              <MessageSquare
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("AI English Coach", "AI English Coach")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "Grammar, Reading, Speaking Tips aur Vocabulary - sab ek jagah",
                "Grammar, Reading, Speaking Tips and Vocabulary - all in one place",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="grammar">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="grammar">Grammar</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="speaking">Speaking Tips</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          </TabsList>

          {/* GRAMMAR TAB */}
          <TabsContent value="grammar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={grammarIdx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                  >
                    <Card className="border border-border/50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge
                            style={{
                              background: "oklch(0.72 0.18 55)",
                              color: "white",
                            }}
                          >
                            Grammar Exercise {grammarIdx + 1}/
                            {grammarExercises.length}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Score: {grammarScore}/{grammarTotal}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div
                          className="p-5 rounded-xl mb-6 border"
                          style={{
                            background: "oklch(0.22 0.12 260 / 0.05)",
                            borderColor: "oklch(0.22 0.12 260 / 0.15)",
                          }}
                        >
                          <p className="font-display font-bold text-lg text-foreground">
                            {currentGrammar.q}
                          </p>
                        </div>

                        <div className="space-y-3 mb-6">
                          {currentGrammar.options.map((opt, idx) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => handleGrammarAnswer(idx)}
                              disabled={selectedAnswer !== null}
                              className={`w-full p-4 rounded-xl border text-left font-medium transition-all ${
                                selectedAnswer === null
                                  ? "hover:border-saffron/50 hover:bg-saffron/5 cursor-pointer"
                                  : idx === currentGrammar.answer
                                    ? "border-india-green bg-india-green/10"
                                    : selectedAnswer === idx
                                      ? "border-destructive bg-destructive/10"
                                      : "opacity-50"
                              }`}
                              style={{
                                borderColor:
                                  selectedAnswer !== null
                                    ? idx === currentGrammar.answer
                                      ? "oklch(0.56 0.18 145)"
                                      : selectedAnswer === idx
                                        ? "oklch(0.57 0.25 27)"
                                        : "oklch(0.88 0.02 260)"
                                    : "oklch(0.88 0.02 260)",
                              }}
                            >
                              <span className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                {opt}
                                {selectedAnswer !== null &&
                                  idx === currentGrammar.answer && (
                                    <CheckCircle
                                      className="h-4 w-4 ml-auto"
                                      style={{ color: "oklch(0.56 0.18 145)" }}
                                    />
                                  )}
                                {selectedAnswer === idx &&
                                  idx !== currentGrammar.answer && (
                                    <AlertCircle className="h-4 w-4 ml-auto text-destructive" />
                                  )}
                              </span>
                            </button>
                          ))}
                        </div>

                        {selectedAnswer !== null && (
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-3"
                            >
                              {!showExplanation ? (
                                <Button
                                  variant="outline"
                                  className="w-full gap-2"
                                  onClick={() => setShowExplanation(true)}
                                >
                                  <BookOpen className="h-4 w-4" />
                                  Explanation dekhein
                                </Button>
                              ) : (
                                <div
                                  className="p-4 rounded-xl border"
                                  style={{
                                    background: "oklch(0.22 0.12 260 / 0.05)",
                                    borderColor: "oklch(0.22 0.12 260 / 0.2)",
                                  }}
                                >
                                  <p className="text-sm font-semibold mb-1">
                                    📝 Explanation:
                                  </p>
                                  <p className="text-sm text-foreground/80">
                                    {currentGrammar.explanation}
                                  </p>
                                </div>
                              )}
                              <Button
                                className="w-full gap-2 bg-saffron hover:bg-saffron/90 text-white"
                                onClick={handleNextGrammar}
                              >
                                Next Exercise{" "}
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Grammar Tips Sidebar */}
              <div>
                <Card className="border border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-display">
                      Grammar Quick Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 p-4 pt-0">
                    {[
                      "Tenses: Present, Past, Future - 12 types",
                      "Articles: a, an, the - kab use karein",
                      "Prepositions: at, in, on, to, for...",
                      "Active vs Passive voice",
                      "Direct vs Indirect speech",
                    ].map((tip) => (
                      <div
                        key={tip}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle
                          className="h-3.5 w-3.5 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.56 0.18 145)" }}
                        />
                        {tip}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* READING TAB */}
          <TabsContent value="reading">
            <Card className="border border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen
                    className="h-5 w-5"
                    style={{ color: "oklch(0.72 0.18 55)" }}
                  />
                  <CardTitle className="font-display">
                    {readingPassage.title}
                  </CardTitle>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  NCERT-Inspired | Copyright Free
                </Badge>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="p-5 rounded-xl bg-muted/40 border border-border/50">
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm">
                    {readingPassage.text}
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-bold text-foreground mb-4">
                    Comprehension Questions:
                  </h3>
                  <div className="space-y-5">
                    {readingPassage.questions.map((q, qi) => (
                      <div key={q.q}>
                        <p className="font-medium text-foreground mb-3 text-sm">
                          Q{qi + 1}. {q.q}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => {
                                if (readingSubmitted) return;
                                const newAnswers = [...readingAnswers];
                                newAnswers[qi] = oi;
                                setReadingAnswers(newAnswers);
                              }}
                              className={`p-3 rounded-lg border text-left text-sm transition-all ${
                                readingSubmitted
                                  ? oi === q.answer
                                    ? "border-india-green bg-india-green/10 font-semibold"
                                    : readingAnswers[qi] === oi
                                      ? "border-destructive bg-destructive/10"
                                      : "opacity-40"
                                  : readingAnswers[qi] === oi
                                    ? "font-semibold"
                                    : "hover:bg-muted"
                              }`}
                              style={{
                                borderColor: readingSubmitted
                                  ? oi === q.answer
                                    ? "oklch(0.56 0.18 145)"
                                    : readingAnswers[qi] === oi
                                      ? "oklch(0.57 0.25 27)"
                                      : "oklch(0.88 0.02 260)"
                                  : readingAnswers[qi] === oi
                                    ? "oklch(0.72 0.18 55)"
                                    : "oklch(0.88 0.02 260)",
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!readingSubmitted ? (
                    <Button
                      className="mt-4 bg-saffron hover:bg-saffron/90 text-white"
                      onClick={handleReadingSubmit}
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <div className="mt-4 p-3 rounded-xl bg-india-green/10 border border-india-green/30">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.35 0.15 145)" }}
                      >
                        ✅ Score:{" "}
                        {
                          readingAnswers.filter(
                            (a, i) => a === readingPassage.questions[i].answer,
                          ).length
                        }{" "}
                        / {readingPassage.questions.length} correct!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SPEAKING TIPS TAB */}
          <TabsContent value="speaking">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakingTips.map((section) => (
                <Card
                  key={section.category}
                  className="border border-border/50"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-display flex items-center gap-2">
                      <Volume2
                        className="h-4 w-4"
                        style={{ color: "oklch(0.72 0.18 55)" }}
                      />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {"tips" in section && section.tips && (
                      <div className="space-y-3">
                        {section.tips.map((tip, i) => (
                          <div key={tip.tip} className="flex items-start gap-2">
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white"
                              style={{ background: "oklch(0.72 0.18 55)" }}
                            >
                              {i + 1}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {tip.tip}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {tip.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {"phrases" in section && section.phrases && (
                      <div className="space-y-2">
                        {section.phrases.map((p) => (
                          <div
                            key={p.phrase}
                            className="p-2 rounded-lg bg-muted/50"
                          >
                            <p className="text-sm font-semibold text-foreground italic">
                              "{p.phrase}"
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Use: {p.use}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* VOCABULARY TAB */}
          <TabsContent value="vocabulary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Word of the Day style card */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={vocabIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                  >
                    <Card
                      className="border-2 overflow-hidden"
                      style={{ borderColor: "oklch(0.72 0.18 55 / 0.5)" }}
                    >
                      <div
                        className="p-2 text-center text-xs font-semibold text-white"
                        style={{ background: "oklch(0.72 0.18 55)" }}
                      >
                        Word {vocabIdx + 1} / {vocabularyWords.length}
                      </div>
                      <CardContent className="p-6">
                        <h2 className="font-display text-4xl font-black text-foreground mb-2">
                          {currentVocab.word}
                        </h2>
                        <p className="text-xs text-muted-foreground italic mb-4">
                          {currentVocab.hindi}
                        </p>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                              Meaning
                            </p>
                            <p className="text-sm text-foreground">
                              {currentVocab.meaning}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-saffron/5 border border-saffron/20">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                              Example
                            </p>
                            <p className="text-sm text-foreground italic">
                              "{currentVocab.example}"
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                              setVocabIdx(
                                (p) =>
                                  (p - 1 + vocabularyWords.length) %
                                  vocabularyWords.length,
                              )
                            }
                          >
                            ← Previous
                          </Button>
                          <Button
                            className="flex-1 bg-saffron hover:bg-saffron/90 text-white"
                            onClick={() =>
                              setVocabIdx(
                                (p) => (p + 1) % vocabularyWords.length,
                              )
                            }
                          >
                            Next →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* All Words List */}
              <div>
                <h3 className="font-display font-bold text-foreground mb-4">
                  All Words
                </h3>
                <div className="space-y-2">
                  {vocabularyWords.map((w, i) => (
                    <button
                      type="button"
                      key={w.word}
                      onClick={() => setVocabIdx(i)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        vocabIdx === i
                          ? "text-white"
                          : "border-border/50 hover:bg-muted/50"
                      }`}
                      style={
                        vocabIdx === i
                          ? {
                              background: "oklch(0.22 0.12 260)",
                              borderColor: "oklch(0.22 0.12 260)",
                            }
                          : {}
                      }
                    >
                      <span className="font-semibold text-sm">{w.word}</span>
                      <span
                        className={`text-xs ml-2 ${vocabIdx === i ? "text-white/60" : "text-muted-foreground"}`}
                      >
                        — {w.meaning.slice(0, 35)}...
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
