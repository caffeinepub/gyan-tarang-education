import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  Brain,
  FileText,
  Hash,
  Loader2,
  Sparkles,
  Star,
  Type,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "shall",
  "should",
  "may",
  "might",
  "must",
  "can",
  "could",
  "to",
  "of",
  "in",
  "for",
  "on",
  "with",
  "at",
  "by",
  "from",
  "as",
  "or",
  "and",
  "but",
  "if",
  "then",
  "this",
  "that",
  "it",
  "its",
  "not",
  "also",
  "which",
  "who",
  "when",
  "where",
  "how",
  "what",
  "all",
  "more",
  "than",
  "their",
  "they",
  "he",
  "she",
  "we",
  "you",
  "i",
  "so",
  "about",
  "up",
  "out",
  "into",
  "through",
  "between",
  "very",
  "just",
  "after",
  "before",
  "each",
  "such",
  "these",
  "those",
  "there",
]);

const KEYWORDS: Record<string, string[]> = {
  important: [
    "important",
    "key",
    "main",
    "primary",
    "significant",
    "major",
    "essential",
    "critical",
    "fundamental",
    "central",
    "basic",
    "core",
    "principal",
    "vital",
  ],
  definition: [
    "is",
    "are",
    "defined",
    "refers",
    "means",
    "represents",
    "consists",
    "involves",
    "known",
  ],
  process: [
    "process",
    "step",
    "stage",
    "phase",
    "procedure",
    "method",
    "way",
    "how",
    "first",
    "second",
    "then",
    "finally",
  ],
};

function extractKeyPoints(text: string): string[] {
  const sentences =
    text.match(/[^.!?]+[.!?]+/g) || text.split(/\n/).filter(Boolean);
  const scored = sentences.map((s) => {
    const lower = s.toLowerCase();
    let score = 0;
    for (const key of Object.values(KEYWORDS).flat()) {
      if (lower.includes(key)) score++;
    }
    return { s: s.trim(), score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored
    .slice(0, 6)
    .map((s) => s.s)
    .filter((s) => s.length > 20);
}

function extractTerms(text: string): string[] {
  const words = text.split(/\W+/);
  const capitals = words.filter(
    (w) => w.length > 3 && /^[A-Z]/.test(w) && !/^[A-Z]{1}$/.test(w),
  );
  const unique = [...new Set(capitals)];
  const techTerms = words.filter(
    (w) => w.length > 5 && !STOP_WORDS.has(w.toLowerCase()),
  );
  const freq: Record<string, number> = {};
  for (const w of techTerms) {
    const lw = w.toLowerCase();
    freq[lw] = (freq[lw] || 0) + 1;
  }
  const topFreq = Object.entries(freq)
    .filter(([, f]) => f >= 2)
    .sort(([, a], [, b]) => b - a)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1))
    .slice(0, 8);
  return [...new Set([...unique.slice(0, 5), ...topFreq])];
}

function createSummary(text: string): string {
  const sentences =
    text.match(/[^.!?]+[.!?]+/g) || text.split(/\n/).filter(Boolean);
  if (sentences.length <= 3) return text;
  const first = sentences[0];
  const last = sentences[sentences.length - 1];
  const mid = sentences[Math.floor(sentences.length / 2)];
  return [first, mid, last].filter(Boolean).join(" ");
}

const ncertTopics: Record<
  string,
  Record<string, { keyPoints: string[]; terms: string[]; summary: string }>
> = {
  Biology: {
    Photosynthesis: {
      keyPoints: [
        "Photosynthesis is the process by which plants convert light energy into chemical energy",
        "The equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
        "Chlorophyll is the green pigment that absorbs light, mainly in chloroplasts",
        "Photosynthesis occurs in two stages: Light reactions (in thylakoids) and Calvin Cycle (in stroma)",
        "Factors affecting photosynthesis: light intensity, CO₂ concentration, temperature, water availability",
        "Plants are autotrophs — they produce their own food through photosynthesis",
      ],
      terms: [
        "Chlorophyll",
        "Chloroplast",
        "ATP",
        "NADPH",
        "Calvin Cycle",
        "Thylakoid",
        "Stroma",
        "Autotroph",
      ],
      summary:
        "Photosynthesis is a vital biological process where green plants, algae, and some bacteria convert sunlight, water, and carbon dioxide into glucose and oxygen. This occurs primarily in the chloroplasts of plant cells. The light-dependent reactions produce ATP and NADPH, while the light-independent reactions (Calvin cycle) use these to synthesize glucose. Photosynthesis is fundamental to life on Earth as it produces oxygen and forms the base of most food chains.",
    },
    "Cell Division": {
      keyPoints: [
        "Cell division is the process by which a parent cell divides into two or more daughter cells",
        "Two main types: Mitosis (for growth and repair) and Meiosis (for sexual reproduction)",
        "Mitosis produces 2 genetically identical diploid cells; Meiosis produces 4 haploid cells",
        "Stages of Mitosis: Prophase, Metaphase, Anaphase, Telophase, Cytokinesis",
        "DNA replication occurs in S phase of interphase before cell division",
        "Uncontrolled cell division leads to cancer",
      ],
      terms: [
        "Mitosis",
        "Meiosis",
        "Chromosome",
        "Diploid",
        "Haploid",
        "Prophase",
        "Metaphase",
        "Cytokinesis",
      ],
      summary:
        "Cell division is essential for growth, reproduction, and repair in organisms. Mitosis is the process of somatic cell division resulting in two genetically identical daughter cells. Meiosis produces four genetically unique haploid cells necessary for sexual reproduction. Both processes involve precise duplication and separation of chromosomes to ensure genetic continuity.",
    },
  },
  Physics: {
    "Laws of Motion": {
      keyPoints: [
        "Newton's First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
        "Newton's Second Law: Force = Mass × Acceleration (F = ma)",
        "Newton's Third Law: For every action, there is an equal and opposite reaction",
        "Momentum: p = mv (mass × velocity); conserved in a closed system",
        "Friction is a force that opposes motion between surfaces in contact",
        "Inertia depends on mass — greater mass means greater inertia",
      ],
      terms: [
        "Inertia",
        "Momentum",
        "Acceleration",
        "Force",
        "Friction",
        "Net Force",
        "Newton",
      ],
      summary:
        "Newton's three laws of motion form the foundation of classical mechanics. The first law establishes inertia as a fundamental property of matter. The second law provides a mathematical relationship between force, mass, and acceleration. The third law explains the principle of action-reaction pairs. Together, these laws explain the behavior of objects under various forces and are essential for understanding everything from car safety to rocket propulsion.",
    },
  },
  Chemistry: {
    "Chemical Reactions": {
      keyPoints: [
        "A chemical reaction involves transformation of reactants into products with new properties",
        "Types: Combination, Decomposition, Displacement, Double Displacement, Combustion, Redox",
        "Law of Conservation of Mass: Mass of reactants = Mass of products",
        "Catalysts speed up reactions without being consumed",
        "Energy is either absorbed (endothermic) or released (exothermic) during reactions",
        "Balanced chemical equation shows equal atoms of each element on both sides",
      ],
      terms: [
        "Reactants",
        "Products",
        "Catalyst",
        "Oxidation",
        "Reduction",
        "Exothermic",
        "Endothermic",
      ],
      summary:
        "Chemical reactions are processes where substances are transformed into different substances. The law of conservation of mass ensures that matter is neither created nor destroyed. Reactions can be classified based on their nature: combination, decomposition, displacement, and redox reactions. Energy considerations are crucial — exothermic reactions release heat while endothermic reactions absorb heat. Catalysts and temperature significantly affect reaction rates.",
    },
  },
  Mathematics: {
    Trigonometry: {
      keyPoints: [
        "Trigonometry deals with relationships between angles and sides of triangles",
        "Primary ratios: sinθ = opp/hyp, cosθ = adj/hyp, tanθ = opp/adj",
        "Pythagorean identity: sin²θ + cos²θ = 1",
        "Special angles: sin30°=½, sin45°=1/√2, sin60°=√3/2",
        "Trigonometric functions are periodic; used in wave analysis, architecture, navigation",
        "Inverse trig functions: arcsin, arccos, arctan find angles from ratios",
      ],
      terms: [
        "Sine",
        "Cosine",
        "Tangent",
        "Hypotenuse",
        "Radian",
        "Amplitude",
        "Periodic Function",
      ],
      summary:
        "Trigonometry is a branch of mathematics studying the relationships between angles and sides of triangles. The three primary trigonometric functions — sine, cosine, and tangent — along with their reciprocals form the foundation. The Pythagorean theorem connects all three functions. Trigonometry has wide applications in physics (waves), engineering (structures), navigation, and computer graphics.",
    },
  },
};

interface SummaryResult {
  keyPoints: string[];
  terms: string[];
  summary: string;
}

export default function AISummarizerPage() {
  const { addXP, earnBadge } = useAppContext();
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [topicMode, setTopicMode] = useState("text");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubSubject, setSelectedSubSubject] = useState("");

  const topicSubjects = Object.keys(ncertTopics);
  const topicOptions = selectedSubSubject
    ? Object.keys(ncertTopics[selectedSubSubject] || {})
    : [];

  const handleSummarize = async () => {
    if (topicMode === "text" && text.trim().length < 50) {
      toast.error("Please enter at least 50 characters of text");
      return;
    }
    if (topicMode === "topic" && !selectedTopic) {
      toast.error("Please select a topic");
      return;
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));

    if (topicMode === "topic" && selectedSubSubject && selectedTopic) {
      const preset = ncertTopics[selectedSubSubject]?.[selectedTopic];
      if (preset) {
        setResult(preset);
        setProcessing(false);
        addXP(20);
        earnBadge("AI Explorer");
        toast.success("⭐ NCERT topic summarized! +20 XP");
        return;
      }
    }

    // Text mode processing
    const kp = extractKeyPoints(text);
    const terms = extractTerms(text);
    const summary = createSummary(text);
    setResult({
      keyPoints:
        kp.length > 0
          ? kp
          : [
              "Key concepts identified from your text",
              "Review the original text for more details",
            ],
      terms: terms.length > 0 ? terms : ["Important terms found in text"],
      summary: summary || `${text.slice(0, 300)}...`,
    });
    setProcessing(false);
    addXP(20);
    earnBadge("AI Explorer");
    toast.success("⭐ Text summarized! +20 XP");
  };

  return (
    <div className="min-h-screen bg-cosmic page-enter">
      {/* Hero */}
      <div
        className="relative py-16 px-4"
        style={{ background: "oklch(0.97 0.02 290)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 60%, oklch(0.85 0.20 195 / 0.07) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "oklch(0.50 0.22 290 / 0.12)",
                border: "1px solid oklch(0.50 0.22 290 / 0.25)",
              }}
            >
              <Sparkles
                className="h-4 w-4"
                style={{ color: "oklch(0.50 0.22 290)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.50 0.22 290)" }}
              >
                AI Text Intelligence
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-neon-gradient">
              AI Summarizer
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.05 220)" }}
            >
              Chapter text paste karein ya NCERT topic choose karein — AI
              instantly key points, terms aur summary generate karega.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="cosmic-card h-full">
              <CardHeader>
                <CardTitle className="text-neon-cyan flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={topicMode} onValueChange={setTopicMode}>
                  <TabsList
                    className="w-full"
                    style={{ background: "oklch(0.97 0.01 260)" }}
                  >
                    <TabsTrigger
                      value="text"
                      className="flex-1"
                      data-ocid="summarizer.text_tab.tab"
                    >
                      Paste Text
                    </TabsTrigger>
                    <TabsTrigger
                      value="topic"
                      className="flex-1"
                      data-ocid="summarizer.topic_tab.tab"
                    >
                      NCERT Topic
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="text" className="mt-4">
                    <div className="space-y-3">
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger
                          style={{
                            background: "oklch(0.97 0.01 260)",
                            borderColor: "oklch(0.88 0.02 270)",
                            color: "white",
                          }}
                          data-ocid="summarizer.subject.select"
                        >
                          <SelectValue placeholder="Subject (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Mathematics",
                            "Science",
                            "Physics",
                            "Chemistry",
                            "Biology",
                            "History",
                            "Geography",
                            "English",
                            "Computer Science",
                            "Economics",
                          ].map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea
                        placeholder="Chapter text yahan paste karein (min 50 characters)..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={12}
                        maxLength={2000}
                        data-ocid="summarizer.text.textarea"
                        style={{
                          background: "oklch(0.97 0.01 260)",
                          borderColor: "oklch(0.88 0.02 270)",
                          color: "white",
                          resize: "vertical",
                        }}
                      />
                      <p
                        className="text-xs text-right"
                        style={{ color: "oklch(0.45 0.03 260)" }}
                      >
                        {text.length}/2000
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="topic" className="mt-4 space-y-3">
                    <Select
                      value={selectedSubSubject}
                      onValueChange={(v) => {
                        setSelectedSubSubject(v);
                        setSelectedTopic("");
                      }}
                    >
                      <SelectTrigger
                        style={{
                          background: "oklch(0.97 0.01 260)",
                          borderColor: "oklch(0.88 0.02 270)",
                          color: "white",
                        }}
                        data-ocid="summarizer.ncert_subject.select"
                      >
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {topicSubjects.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedTopic}
                      onValueChange={setSelectedTopic}
                      disabled={!selectedSubSubject}
                    >
                      <SelectTrigger
                        style={{
                          background: "oklch(0.97 0.01 260)",
                          borderColor: "oklch(0.88 0.02 270)",
                          color: "white",
                        }}
                        data-ocid="summarizer.ncert_topic.select"
                      >
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topicOptions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedSubSubject && (
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.40 0.03 260)" }}
                      >
                        Government-approved NCERT curriculum content. More
                        topics coming soon.
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
                <Button
                  className="w-full font-bold"
                  onClick={handleSummarize}
                  disabled={processing}
                  data-ocid="summarizer.summarize.primary_button"
                  style={{
                    background: "oklch(0.50 0.22 290)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Summarize
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AnimatePresence mode="wait">
              {!result && !processing ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64 rounded-2xl"
                  style={{
                    border: "1px dashed oklch(0.50 0.22 290 / 0.25)",
                    background: "oklch(0.97 0.01 260)",
                  }}
                  data-ocid="summarizer.empty_state"
                >
                  <Sparkles
                    className="h-16 w-16 mb-4"
                    style={{ color: "oklch(0.50 0.22 290 / 0.25)" }}
                  />
                  <p style={{ color: "oklch(0.40 0.03 260)" }}>
                    Enter text or select a topic to summarize
                  </p>
                </motion.div>
              ) : processing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64"
                  data-ocid="summarizer.loading_state"
                >
                  <Brain
                    className="h-16 w-16 animate-pulse"
                    style={{ color: "oklch(0.50 0.22 290)" }}
                  />
                  <p className="mt-4 text-neon-cyan font-semibold">
                    AI is processing your text...
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Key Points */}
                  <Card className="cosmic-card">
                    <CardHeader className="pb-3">
                      <CardTitle
                        className="text-sm flex items-center gap-2"
                        style={{ color: "oklch(0.50 0.22 290)" }}
                      >
                        <Star className="h-4 w-4" /> Key Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.keyPoints.map((kp, i) => (
                          <li
                            key={kp.slice(0, 10) + String(i)}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "oklch(0.72 0.04 220)" }}
                          >
                            <span className="text-neon-cyan font-bold flex-shrink-0">
                              {i + 1}.
                            </span>
                            {kp}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Important Terms */}
                  <Card className="cosmic-card">
                    <CardHeader className="pb-3">
                      <CardTitle
                        className="text-sm flex items-center gap-2"
                        style={{ color: "oklch(0.45 0.20 145)" }}
                      >
                        <Hash className="h-4 w-4" /> Important Terms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.terms.map((term) => (
                          <Badge
                            key={term}
                            style={{
                              background: "oklch(0.45 0.20 145 / 0.15)",
                              color: "oklch(0.45 0.20 145)",
                              borderColor: "oklch(0.45 0.20 145 / 0.25)",
                            }}
                          >
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Summary */}
                  <Card className="cosmic-card">
                    <CardHeader className="pb-3">
                      <CardTitle
                        className="text-sm flex items-center gap-2"
                        style={{ color: "oklch(0.45 0.22 290)" }}
                      >
                        <Type className="h-4 w-4" /> Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "oklch(0.68 0.04 220)" }}
                      >
                        {result.summary}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
