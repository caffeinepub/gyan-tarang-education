import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/AppContext";
import { BookOpen, ExternalLink, Search, Shield, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const examCategories = [
  { id: "all", labelHi: "सभी", labelEn: "All" },
  { id: "engineering", labelHi: "Engineering", labelEn: "Engineering" },
  { id: "medical", labelHi: "Medical", labelEn: "Medical" },
  { id: "civil", labelHi: "Civil Services", labelEn: "Civil Services" },
  { id: "banking", labelHi: "Banking", labelEn: "Banking" },
  { id: "railway", labelHi: "Railway", labelEn: "Railway" },
  { id: "police", labelHi: "Police", labelEn: "Police" },
  { id: "defence", labelHi: "Defence", labelEn: "Defence" },
  { id: "law", labelHi: "Law", labelEn: "Law" },
  { id: "management", labelHi: "Management", labelEn: "Management" },
  { id: "other", labelHi: "Other", labelEn: "Other" },
];

const exams = [
  // Engineering
  {
    id: "jee-main",
    name: "JEE Main",
    descHi: "Joint Entrance Examination - Engineering admission",
    descEn: "Joint Entrance Exam for top engineering colleges",
    category: "engineering",
    officialUrl: "https://jeemain.nta.nic.in",
    color: "saffron",
    level: "National",
  },
  {
    id: "jee-adv",
    name: "JEE Advanced",
    descHi: "IIT admission ke liye",
    descEn: "Admission to IITs",
    category: "engineering",
    officialUrl: "https://jeeadv.ac.in",
    color: "saffron",
    level: "National",
  },
  {
    id: "gate",
    name: "GATE",
    descHi: "Graduate Aptitude Test in Engineering",
    descEn: "Graduate Aptitude Test in Engineering",
    category: "engineering",
    officialUrl: "https://gate2025.iitr.ac.in",
    color: "saffron",
    level: "National",
  },
  {
    id: "cuet",
    name: "CUET",
    descHi: "Central Universities Common Entrance Test",
    descEn: "Central Universities Entrance Test",
    category: "engineering",
    officialUrl: "https://cuet.nta.nic.in",
    color: "saffron",
    level: "National",
  },
  // Medical
  {
    id: "neet",
    name: "NEET UG",
    descHi: "Medical college admission - MBBS/BDS",
    descEn: "Admission to medical colleges MBBS/BDS",
    category: "medical",
    officialUrl: "https://neet.nta.nic.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "neet-pg",
    name: "NEET PG",
    descHi: "Postgraduate medical admission",
    descEn: "Postgraduate medical admission",
    category: "medical",
    officialUrl: "https://natboard.edu.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "aiims",
    name: "AIIMS MBBS",
    descHi: "AIIMS admission entrance exam",
    descEn: "AIIMS medical entrance",
    category: "medical",
    officialUrl: "https://www.aiims.edu",
    color: "india-green",
    level: "National",
  },
  // Civil Services
  {
    id: "upsc-cse",
    name: "UPSC CSE",
    descHi: "IAS/IPS/IFS banane ke liye",
    descEn: "For IAS/IPS/IFS positions",
    category: "civil",
    officialUrl: "https://upsc.gov.in",
    color: "navy",
    level: "National",
  },
  {
    id: "upsc-cds",
    name: "UPSC CDS",
    descHi: "Combined Defence Services",
    descEn: "Combined Defence Services exam",
    category: "civil",
    officialUrl: "https://upsc.gov.in",
    color: "navy",
    level: "National",
  },
  {
    id: "uppsc",
    name: "UPPSC",
    descHi: "Uttar Pradesh Public Service Commission",
    descEn: "UP State Civil Services",
    category: "civil",
    officialUrl: "https://uppsc.up.nic.in",
    color: "navy",
    level: "State",
  },
  {
    id: "bpsc",
    name: "BPSC",
    descHi: "Bihar Public Service Commission",
    descEn: "Bihar State Civil Services",
    category: "civil",
    officialUrl: "https://bpsc.bih.nic.in",
    color: "navy",
    level: "State",
  },
  // Banking
  {
    id: "ibps-po",
    name: "IBPS PO",
    descHi: "Bank Probationary Officer",
    descEn: "Bank Probationary Officer",
    category: "banking",
    officialUrl: "https://ibps.in",
    color: "saffron",
    level: "National",
  },
  {
    id: "ibps-clerk",
    name: "IBPS Clerk",
    descHi: "Bank Clerk position",
    descEn: "Bank Clerk position",
    category: "banking",
    officialUrl: "https://ibps.in",
    color: "saffron",
    level: "National",
  },
  {
    id: "sbi-po",
    name: "SBI PO",
    descHi: "State Bank of India PO",
    descEn: "State Bank of India PO",
    category: "banking",
    officialUrl: "https://sbi.co.in/careers",
    color: "saffron",
    level: "National",
  },
  {
    id: "sbi-clerk",
    name: "SBI Clerk",
    descHi: "State Bank of India Clerk",
    descEn: "State Bank of India Clerk",
    category: "banking",
    officialUrl: "https://sbi.co.in/careers",
    color: "saffron",
    level: "National",
  },
  {
    id: "rbi-grade-b",
    name: "RBI Grade B",
    descHi: "Reserve Bank of India officer",
    descEn: "Reserve Bank of India officer",
    category: "banking",
    officialUrl: "https://www.rbi.org.in/Scripts/vacancies.aspx",
    color: "saffron",
    level: "National",
  },
  // SSC
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    descHi: "Combined Graduate Level - Group B/C posts",
    descEn: "Combined Graduate Level exam",
    category: "other",
    officialUrl: "https://ssc.nic.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "ssc-chsl",
    name: "SSC CHSL",
    descHi: "Combined Higher Secondary Level",
    descEn: "Combined Higher Secondary Level",
    category: "other",
    officialUrl: "https://ssc.nic.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "ssc-mts",
    name: "SSC MTS",
    descHi: "Multi Tasking Staff",
    descEn: "Multi Tasking Staff",
    category: "other",
    officialUrl: "https://ssc.nic.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "ssc-gd",
    name: "SSC GD Constable",
    descHi: "CISF/BSF/CRPF GD Constable",
    descEn: "GD Constable in paramilitary forces",
    category: "police",
    officialUrl: "https://ssc.nic.in",
    color: "navy",
    level: "National",
  },
  // Railway
  {
    id: "rrb-ntpc",
    name: "RRB NTPC",
    descHi: "Railway Non-Technical Popular Category",
    descEn: "Railway NTPC posts",
    category: "railway",
    officialUrl: "https://indianrailways.gov.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "rrb-je",
    name: "RRB JE",
    descHi: "Railway Junior Engineer",
    descEn: "Railway Junior Engineer",
    category: "railway",
    officialUrl: "https://indianrailways.gov.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "rrb-group-d",
    name: "RRB Group D",
    descHi: "Railway Group D posts",
    descEn: "Railway Group D recruitment",
    category: "railway",
    officialUrl: "https://indianrailways.gov.in",
    color: "india-green",
    level: "National",
  },
  // Police
  {
    id: "bihar-police",
    name: "Bihar Police",
    descHi: "Bihar Police Constable/SI",
    descEn: "Bihar Police Constable/Sub-Inspector",
    category: "police",
    officialUrl: "https://csbc.bih.nic.in",
    color: "navy",
    level: "State",
  },
  {
    id: "up-police",
    name: "UP Police",
    descHi: "UP Police Constable/SI",
    descEn: "UP Police recruitment",
    category: "police",
    officialUrl: "https://uppbpb.gov.in",
    color: "navy",
    level: "State",
  },
  // Defence
  {
    id: "nda",
    name: "NDA",
    descHi: "National Defence Academy",
    descEn: "National Defence Academy exam",
    category: "defence",
    officialUrl: "https://upsc.gov.in",
    color: "navy",
    level: "National",
  },
  {
    id: "afcat",
    name: "AFCAT",
    descHi: "Air Force Common Admission Test",
    descEn: "Air Force Common Admission Test",
    category: "defence",
    officialUrl: "https://afcat.cdac.in",
    color: "navy",
    level: "National",
  },
  // Law
  {
    id: "clat",
    name: "CLAT",
    descHi: "Common Law Admission Test",
    descEn: "Common Law Admission Test",
    category: "law",
    officialUrl: "https://consortiumofnlus.ac.in",
    color: "saffron",
    level: "National",
  },
  // Management
  {
    id: "cat",
    name: "CAT",
    descHi: "Common Admission Test - IIM",
    descEn: "Common Admission Test for IIMs",
    category: "management",
    officialUrl: "https://iimcat.ac.in",
    color: "saffron",
    level: "National",
  },
  // Other
  {
    id: "net",
    name: "UGC NET",
    descHi: "National Eligibility Test - Teaching/JRF",
    descEn: "National Eligibility Test for teaching",
    category: "other",
    officialUrl: "https://ugcnet.nta.nic.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "ctet",
    name: "CTET",
    descHi: "Central Teacher Eligibility Test",
    descEn: "Central Teacher Eligibility Test",
    category: "other",
    officialUrl: "https://ctet.nic.in",
    color: "india-green",
    level: "National",
  },
  {
    id: "nabard",
    name: "NABARD",
    descHi: "National Bank for Agriculture",
    descEn: "NABARD recruitment exam",
    category: "banking",
    officialUrl: "https://www.nabard.org/careers.aspx",
    color: "saffron",
    level: "National",
  },
];

export default function CompetitiveExamsPage() {
  const { t } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = exams.filter((exam) => {
    const matchesCat =
      activeCategory === "all" || exam.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.descEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
              <Trophy
                className="h-8 w-8"
                style={{ color: "oklch(0.76 0.12 350)" }}
              />
              <h1 className="font-display text-3xl font-black text-foreground">
                {t("Competitive Exams", "Competitive Exams")}
              </h1>
            </div>
            <p className="text-foreground/70">
              {t(
                "50+ Competitive Exams की free preparation - JEE, NEET, UPSC, SSC, Banking, Railway और बहुत कुछ",
                "Free preparation for 50+ competitive exams - JEE, NEET, UPSC, SSC, Banking, Railway and more",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Official Links</span>
              <span className="badge-govt">📚 Free Study Material</span>
              <span className="badge-made-in-india">🇮🇳 All India Exams</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Exam search karein...", "Search exams...")}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-ocid="competitive.search_input"
          />
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 mb-6"
          data-ocid="competitive.filter.tab"
        >
          {examCategories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={
                activeCategory === cat.id
                  ? { background: "oklch(0.76 0.12 350)" }
                  : {}
              }
            >
              {t(cat.labelHi, cat.labelEn)}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {t("exams मिले", "exams found")}
        </p>

        {/* Exam Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.map((exam, idx) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.04, 0.4) }}
            >
              <Card className="card-hover border border-border/50 h-full overflow-hidden">
                <div
                  className="h-1.5"
                  style={{
                    background:
                      exam.color === "saffron"
                        ? "oklch(0.76 0.12 350)"
                        : exam.color === "navy"
                          ? "oklch(0.62 0.28 340)"
                          : "oklch(0.65 0.22 340)",
                  }}
                />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-foreground">
                      {exam.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] shrink-0"
                      style={{
                        borderColor:
                          exam.color === "saffron"
                            ? "oklch(0.72 0.18 55 / 0.4)"
                            : exam.color === "navy"
                              ? "oklch(0.75 0.20 348 / 0.4)"
                              : "oklch(0.56 0.18 145 / 0.4)",
                        color:
                          exam.color === "saffron"
                            ? "oklch(0.76 0.12 350)"
                            : exam.color === "navy"
                              ? "oklch(0.62 0.28 340)"
                              : "oklch(0.65 0.22 340)",
                      }}
                    >
                      {exam.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {t(exam.descHi, exam.descEn)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs gap-1"
                      style={{
                        background:
                          exam.color === "saffron"
                            ? "oklch(0.76 0.12 350)"
                            : exam.color === "navy"
                              ? "oklch(0.62 0.28 340)"
                              : "oklch(0.65 0.22 340)",
                        color: "white",
                      }}
                      onClick={() => window.open(exam.officialUrl, "_blank")}
                    >
                      <BookOpen className="h-3 w-3" />
                      {t("Study", "Study")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1"
                      onClick={() => window.open(exam.officialUrl, "_blank")}
                      data-ocid="competitive.link"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {t("Official", "Official")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div
            className="text-center py-12"
            data-ocid="competitive.empty_state"
          >
            <Trophy className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              {t("Koi exam nahi mila", "No exams found")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
