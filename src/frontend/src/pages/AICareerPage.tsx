import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  Building2,
  GraduationCap,
  IndianRupee,
  Loader2,
  Map as MapIcon,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const interestOptions = [
  { id: "technology", label: "Technology & Computers" },
  { id: "arts", label: "Arts & Humanities" },
  { id: "science", label: "Science & Research" },
  { id: "commerce", label: "Commerce & Finance" },
  { id: "sports", label: "Sports & Fitness" },
  { id: "teaching", label: "Teaching & Education" },
  { id: "government", label: "Government Service" },
  { id: "healthcare", label: "Healthcare & Medicine" },
  { id: "law", label: "Law & Justice" },
  { id: "business", label: "Business & Management" },
];

interface CareerPath {
  title: string;
  description: string;
  skills: string[];
  colleges: string[];
  examRelevance: string[];
  salaryRange: string;
  color: string;
}

type CareerMap = Record<string, CareerPath[]>;

const careerDatabase: CareerMap = {
  technology: [
    {
      title: "Software Engineer",
      description:
        "Design, develop and maintain software applications. High demand globally with excellent growth prospects.",
      skills: [
        "Programming",
        "Data Structures",
        "System Design",
        "Problem Solving",
      ],
      colleges: [
        "IIT Bombay",
        "IIT Delhi",
        "NIT Trichy",
        "IIIT Hyderabad",
        "BIT Mesra",
      ],
      examRelevance: ["JEE Advanced", "JEE Main", "BITSAT", "VITEEE"],
      salaryRange: "₹6L - ₹50L+ per year",
      color: "oklch(0.50 0.22 290)",
    },
    {
      title: "Data Scientist / AI Engineer",
      description:
        "Work with large datasets to extract insights and build AI/ML models. One of the fastest-growing fields globally.",
      skills: [
        "Python",
        "Machine Learning",
        "Statistics",
        "Data Visualization",
      ],
      colleges: [
        "IIT Madras",
        "IISc Bangalore",
        "IIT Kharagpur",
        "BITS Pilani",
        "NIT Warangal",
      ],
      examRelevance: ["JEE Advanced", "GATE CS", "GATE Statistics"],
      salaryRange: "₹8L - ₹60L+ per year",
      color: "oklch(0.45 0.20 145)",
    },
    {
      title: "Cybersecurity Specialist",
      description:
        "Protect digital infrastructure from threats. Critical role in every government and private organization.",
      skills: ["Networking", "Ethical Hacking", "Cryptography", "Linux"],
      colleges: ["IIT Jodhpur", "NIT Surat", "CDAC Pune", "IIIT Delhi"],
      examRelevance: ["JEE Main", "GATE IT", "CEH Certification"],
      salaryRange: "₹5L - ₹40L per year",
      color: "oklch(0.45 0.22 290)",
    },
  ],
  science: [
    {
      title: "Research Scientist (ISRO/DRDO/CSIR)",
      description:
        "Contribute to national scientific research in space, defense, or fundamental sciences.",
      skills: [
        "Research Methodology",
        "Advanced Mathematics",
        "Lab Techniques",
        "Scientific Writing",
      ],
      colleges: [
        "IISc Bangalore",
        "IIT Roorkee",
        "NIT Raipur",
        "Tata Institute",
        "University of Delhi",
      ],
      examRelevance: ["GATE", "CSIR NET", "UPSC ESE", "JEST"],
      salaryRange: "₹6L - ₹25L per year",
      color: "oklch(0.55 0.22 55)",
    },
    {
      title: "Environmental Scientist",
      description:
        "Study and protect natural environments. Growing field with government and NGO opportunities.",
      skills: ["Field Research", "GIS", "Data Analysis", "Policy Knowledge"],
      colleges: [
        "JNU Delhi",
        "BHU Varanasi",
        "University of Hyderabad",
        "Pune University",
      ],
      examRelevance: ["UPSC CSE", "State PSC", "UGC NET"],
      salaryRange: "₹4L - ₹18L per year",
      color: "oklch(0.45 0.20 145)",
    },
  ],
  government: [
    {
      title: "IAS / IPS Officer",
      description:
        "Top administrative and police services of India. High responsibility, prestige and job security.",
      skills: [
        "Current Affairs",
        "Administrative Law",
        "Leadership",
        "Decision Making",
      ],
      colleges: ["Any recognized university for graduation"],
      examRelevance: ["UPSC CSE", "LBSNAA Training"],
      salaryRange: "₹56K - ₹2.5L per month + perks",
      color: "oklch(0.55 0.22 55)",
    },
    {
      title: "SSC / Banking Officer",
      description:
        "Join government departments or nationalized banks. Stable career with good benefits and growth.",
      skills: [
        "Quantitative Aptitude",
        "Reasoning",
        "English",
        "Computer Knowledge",
      ],
      colleges: ["Any graduation degree required"],
      examRelevance: ["SSC CGL", "IBPS PO", "SBI PO", "RBI Grade B"],
      salaryRange: "₹3L - ₹12L per year",
      color: "oklch(0.45 0.22 290)",
    },
  ],
  healthcare: [
    {
      title: "Doctor (MBBS / MD)",
      description:
        "Diagnose and treat patients. One of the most respected professions with excellent job security.",
      skills: ["Biology", "Chemistry", "Clinical Skills", "Patient Care"],
      colleges: [
        "AIIMS Delhi",
        "AIIMS Bhopal",
        "BHU Medical",
        "KMC Manipal",
        "State Medical Colleges",
      ],
      examRelevance: ["NEET UG", "NEET PG", "AIIMS Entrance"],
      salaryRange: "₹8L - ₹1Cr+ per year (private)",
      color: "oklch(0.50 0.22 290)",
    },
    {
      title: "Pharmacist / Medical Researcher",
      description:
        "Develop medicines and medical solutions. Growing field with research and industry opportunities.",
      skills: [
        "Pharmacology",
        "Chemistry",
        "Research Methods",
        "Regulatory Affairs",
      ],
      colleges: [
        "Jamia Hamdard",
        "NIPER",
        "Manipal College of Pharmacy",
        "JSS Pharmacy",
      ],
      examRelevance: ["NEET", "GPAT", "State Pharmacy Entrance"],
      salaryRange: "₹3L - ₹20L per year",
      color: "oklch(0.45 0.20 145)",
    },
  ],
  commerce: [
    {
      title: "Chartered Accountant (CA)",
      description:
        "India's premier financial professional. Audit, tax, and financial advisory services.",
      skills: ["Accounting", "Taxation", "Audit", "Financial Analysis"],
      colleges: [
        "ICAI (Institute) + Any College for BCom",
        "DU Commerce",
        "Shri Ram College",
      ],
      examRelevance: ["CA Foundation", "CA Intermediate", "CA Final"],
      salaryRange: "₹6L - ₹50L+ per year",
      color: "oklch(0.55 0.22 55)",
    },
    {
      title: "Investment Banker / Finance Manager",
      description:
        "Manage large financial transactions, mergers, and investments for corporations.",
      skills: [
        "Financial Modeling",
        "Valuation",
        "Excel/Python",
        "Corporate Law Basics",
      ],
      colleges: [
        "IIM Ahmedabad",
        "IIM Bangalore",
        "FMS Delhi",
        "XLRI Jamshedpur",
      ],
      examRelevance: ["CAT", "XAT", "GMAT", "CFA"],
      salaryRange: "₹10L - ₹1Cr+ per year",
      color: "oklch(0.50 0.22 290)",
    },
  ],
  teaching: [
    {
      title: "Professor / Academic Researcher",
      description:
        "Teach at university level and conduct research. Contribute to knowledge creation.",
      skills: [
        "Subject Expertise",
        "Communication",
        "Research Writing",
        "Mentoring",
      ],
      colleges: ["IITs for GATE", "JNU", "BHU", "DU", "Regional Universities"],
      examRelevance: ["UGC NET", "GATE", "UPSC (Academic)"],
      salaryRange: "₹5L - ₹25L per year",
      color: "oklch(0.45 0.20 145)",
    },
  ],
  arts: [
    {
      title: "Journalist / Media Professional",
      description:
        "Report news, create content, and inform society. Diverse roles across print, digital, and broadcast.",
      skills: ["Writing", "Investigation", "Communication", "Social Media"],
      colleges: [
        "IIMC New Delhi",
        "AJK MCRC Delhi",
        "Symbiosis Pune",
        "Manipal Institute",
      ],
      examRelevance: ["IIMC Entrance", "UPSC CSE (Journalism optional)"],
      salaryRange: "₹3L - ₹25L per year",
      color: "oklch(0.45 0.22 290)",
    },
  ],
  law: [
    {
      title: "Advocate / Legal Professional",
      description:
        "Represent clients in courts and provide legal counsel. High-growth profession in India.",
      skills: [
        "Legal Research",
        "Argumentation",
        "Constitutional Law",
        "Contract Law",
      ],
      colleges: [
        "NLSIU Bangalore",
        "NALSAR Hyderabad",
        "NLU Delhi",
        "Symbiosis Law",
      ],
      examRelevance: ["CLAT", "AILET", "LSAT India"],
      salaryRange: "₹4L - ₹50L+ per year",
      color: "oklch(0.55 0.22 55)",
    },
  ],
  business: [
    {
      title: "Entrepreneur / Startup Founder",
      description:
        "Build your own business from ground up. High risk, high reward — create jobs for others.",
      skills: [
        "Business Strategy",
        "Marketing",
        "Finance Basics",
        "Leadership",
      ],
      colleges: ["IIM Ahmedabad", "IIT (Any Branch)", "XLRI", "MDI Gurgaon"],
      examRelevance: ["CAT", "XAT (MBA after)", "IIM Startup Programs"],
      salaryRange: "Unlimited potential!",
      color: "oklch(0.50 0.22 290)",
    },
  ],
};

function getCareerPaths(interests: string[]): CareerPath[] {
  const results: CareerPath[] = [];
  for (const interest of interests) {
    const paths = careerDatabase[interest] || [];
    results.push(...paths);
  }
  if (results.length === 0) {
    results.push(...(careerDatabase.technology || []));
  }
  // Deduplicate by title
  const seen = new Set<string>();
  return results
    .filter((c) => {
      if (seen.has(c.title)) return false;
      seen.add(c.title);
      return true;
    })
    .slice(0, 5);
}

export default function AICareerPage() {
  const { addXP, earnBadge } = useAppContext();
  const [interests, setInterests] = useState<string[]>([]);
  const [stream, setStream] = useState("");
  const [results, setResults] = useState<CareerPath[]>([]);
  const [generating, setGenerating] = useState(false);

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleGenerate = async () => {
    if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 900));
    const paths = getCareerPaths(interests);
    setResults(paths);
    setGenerating(false);
    addXP(30);
    earnBadge("AI Explorer");
    toast.success("⭐ Career paths generated! +30 XP");
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
              "radial-gradient(circle at 60% 60%, oklch(0.82 0.18 55 / 0.07) 0%, transparent 50%)",
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
                background: "oklch(0.82 0.18 55 / 0.12)",
                border: "1px solid oklch(0.82 0.18 55 / 0.3)",
              }}
            >
              <GraduationCap
                className="h-4 w-4"
                style={{ color: "oklch(0.55 0.22 55)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.55 0.22 55)" }}
              >
                AI Career Guidance
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-neon-gradient">
              AI Career Counselor
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.05 220)" }}
            >
              Apne interests ke hisaab se best career paths discover karein.
              Indian colleges, exams aur salary info ke saath.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Config */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="text-neon-cyan flex items-center gap-2">
                  <Star className="h-5 w-5" /> Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p
                    className="text-sm font-semibold mb-3 block"
                    style={{ color: "oklch(0.25 0.03 260)" }}
                  >
                    Current Stream / Class
                  </p>
                  <Select value={stream} onValueChange={setStream}>
                    <SelectTrigger
                      style={{
                        background: "oklch(0.97 0.01 260)",
                        borderColor: "oklch(0.88 0.02 270)",
                        color: "white",
                      }}
                      data-ocid="career.stream.select"
                    >
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Class 10",
                        "Class 11-12 Science",
                        "Class 11-12 Commerce",
                        "Class 11-12 Arts",
                        "BTech / Engineering",
                        "BSc",
                        "BCom",
                        "BA",
                        "BCA",
                        "MBA / Masters",
                      ].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p
                    className="text-sm font-semibold mb-3 block"
                    style={{ color: "oklch(0.25 0.03 260)" }}
                  >
                    Select Your Interests (choose multiple)
                  </p>
                  <div className="space-y-2">
                    {interestOptions.map((opt) => (
                      <div key={opt.id} className="flex items-center gap-2">
                        <Checkbox
                          id={opt.id}
                          checked={interests.includes(opt.id)}
                          onCheckedChange={() => toggleInterest(opt.id)}
                          data-ocid={`career.interest.${opt.id}.checkbox`}
                        />
                        <Label
                          htmlFor={opt.id}
                          className="text-sm cursor-pointer"
                          style={{
                            color: interests.includes(opt.id)
                              ? "oklch(0.50 0.22 290)"
                              : "oklch(0.45 0.03 260)",
                          }}
                        >
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full font-bold"
                  onClick={handleGenerate}
                  disabled={generating}
                  data-ocid="career.generate.primary_button"
                  style={{
                    background: "oklch(0.55 0.22 55)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Career Paths
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {results.length === 0 && !generating ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64 rounded-2xl"
                  style={{
                    border: "1px dashed oklch(0.82 0.18 55 / 0.3)",
                    background: "oklch(0.97 0.01 260)",
                  }}
                  data-ocid="career.empty_state"
                >
                  <MapIcon
                    className="h-16 w-16 mb-4"
                    style={{ color: "oklch(0.82 0.18 55 / 0.3)" }}
                  />
                  <p style={{ color: "oklch(0.40 0.03 260)" }}>
                    Select interests and get personalized career paths
                  </p>
                </motion.div>
              ) : generating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64"
                  data-ocid="career.loading_state"
                >
                  <GraduationCap
                    className="h-16 w-16 animate-pulse"
                    style={{ color: "oklch(0.55 0.22 55)" }}
                  />
                  <p
                    className="mt-4 font-semibold"
                    style={{ color: "oklch(0.55 0.22 55)" }}
                  >
                    AI is mapping your career paths...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  <h2 className="font-display text-xl font-bold text-neon-gradient mb-2">
                    Recommended Career Paths
                  </h2>
                  {results.map((career, i) => (
                    <motion.div
                      key={career.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      data-ocid={`career.result.item.${i + 1}`}
                    >
                      <Card
                        className="cosmic-card"
                        style={{ borderColor: `${career.color}33` }}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3
                              className="font-display text-lg font-bold"
                              style={{ color: career.color }}
                            >
                              {career.title}
                            </h3>
                            <div
                              className="flex items-center gap-1 text-sm font-semibold"
                              style={{ color: "oklch(0.45 0.20 145)" }}
                            >
                              <IndianRupee className="h-4 w-4" />
                              <span className="text-xs">
                                {career.salaryRange}
                              </span>
                            </div>
                          </div>
                          <p
                            className="text-sm mb-4"
                            style={{ color: "oklch(0.62 0.04 220)" }}
                          >
                            {career.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <p
                                className="text-xs font-bold mb-2 flex items-center gap-1"
                                style={{ color: "oklch(0.50 0.22 290)" }}
                              >
                                <TrendingUp className="h-3 w-3" /> Key Skills
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {career.skills.map((s) => (
                                  <Badge
                                    key={s}
                                    className="text-[10px]"
                                    style={{
                                      background: "oklch(0.50 0.22 290 / 0.10)",
                                      color: "oklch(0.50 0.22 290)",
                                      borderColor:
                                        "oklch(0.50 0.22 290 / 0.15)",
                                    }}
                                  >
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p
                                className="text-xs font-bold mb-2 flex items-center gap-1"
                                style={{ color: "oklch(0.45 0.20 145)" }}
                              >
                                <Building2 className="h-3 w-3" /> Top Colleges
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {career.colleges.slice(0, 3).map((c) => (
                                  <Badge
                                    key={c}
                                    className="text-[10px]"
                                    style={{
                                      background: "oklch(0.45 0.20 145 / 0.10)",
                                      color: "oklch(0.45 0.20 145)",
                                      borderColor:
                                        "oklch(0.45 0.20 145 / 0.15)",
                                    }}
                                  >
                                    {c}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p
                                className="text-xs font-bold mb-2 flex items-center gap-1"
                                style={{ color: "oklch(0.55 0.22 55)" }}
                              >
                                <BookOpen className="h-3 w-3" /> Key Exams
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {career.examRelevance.slice(0, 3).map((e) => (
                                  <Badge
                                    key={e}
                                    className="text-[10px]"
                                    style={{
                                      background: "oklch(0.55 0.22 55 / 0.10)",
                                      color: "oklch(0.55 0.22 55)",
                                      borderColor: "oklch(0.82 0.18 55 / 0.2)",
                                    }}
                                  >
                                    {e}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
