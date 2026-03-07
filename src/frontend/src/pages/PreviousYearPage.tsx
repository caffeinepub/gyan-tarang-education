import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  CheckCircle,
  ClipboardList,
  ExternalLink,
  FileText,
  GraduationCap,
  Shield,
  Siren,
} from "lucide-react";
import { motion } from "motion/react";

interface PYQCard {
  exam: string;
  org: string;
  years: string;
  paperCount: string;
  desc: string;
  paperUrl: string;
  answerUrl: string;
  badge: string;
  urgent?: boolean;
}

const boardExamPYQ: PYQCard[] = [
  {
    exam: "CBSE Class 12 - All Subjects",
    org: "CBSE",
    years: "2017-2024",
    paperCount: "50+ Papers",
    desc: "Class 12 Board Exam previous year question papers for all subjects - Physics, Chemistry, Maths, Biology, English",
    paperUrl: "https://cbse.gov.in/cbsenew/question-paper.html",
    answerUrl: "https://cbseacademic.nic.in/SQP_CLASSXII.html",
    badge: "Class 12",
  },
  {
    exam: "CBSE Class 10 - All Subjects",
    org: "CBSE",
    years: "2017-2024",
    paperCount: "50+ Papers",
    desc: "Class 10 Board Exam previous year question papers - Science, Maths, Social Science, English, Hindi",
    paperUrl: "https://cbse.gov.in/cbsenew/question-paper.html",
    answerUrl: "https://cbseacademic.nic.in/SQP_CLASSX.html",
    badge: "Class 10",
  },
  {
    exam: "CBSE Sample Papers Class 12",
    org: "CBSE Academic",
    years: "2023-25",
    paperCount: "20+ Papers",
    desc: "Latest CBSE Class 12 sample question papers with marking scheme and model answers",
    paperUrl: "https://cbseacademic.nic.in/SQP_CLASSXII.html",
    answerUrl: "https://cbseacademic.nic.in/SQP_CLASSXII.html",
    badge: "Sample Papers",
  },
  {
    exam: "CBSE Sample Papers Class 10",
    org: "CBSE Academic",
    years: "2023-25",
    paperCount: "20+ Papers",
    desc: "Latest CBSE Class 10 sample question papers with full solutions and marking scheme",
    paperUrl: "https://cbseacademic.nic.in/SQP_CLASSX.html",
    answerUrl: "https://cbseacademic.nic.in/SQP_CLASSX.html",
    badge: "Sample Papers",
  },
];

const jeeNeetPYQ: PYQCard[] = [
  {
    exam: "JEE Main Previous Year Papers",
    org: "NTA (National Testing Agency)",
    years: "2015-2024",
    paperCount: "100+ Papers",
    desc: "JEE Main all sessions question papers with official answer keys - January & April sessions",
    paperUrl: "https://nta.ac.in/Download/ExamPaper",
    answerUrl: "https://nta.ac.in/Download/ExamPaper",
    badge: "JEE Main",
    urgent: true,
  },
  {
    exam: "JEE Advanced Previous Year Papers",
    org: "IIT (JEE Advanced)",
    years: "2013-2024",
    paperCount: "25+ Papers",
    desc: "JEE Advanced Paper 1 & Paper 2 with official solutions - IIT admission gateway",
    paperUrl: "https://jeeadv.ac.in/pastques.html",
    answerUrl: "https://jeeadv.ac.in/pastques.html",
    badge: "JEE Advanced",
    urgent: true,
  },
  {
    exam: "NEET UG Previous Year Papers",
    org: "NTA (National Testing Agency)",
    years: "2014-2024",
    paperCount: "15+ Papers",
    desc: "NEET UG previous year question papers with official answer keys for MBBS/BDS admission",
    paperUrl: "https://nta.ac.in/Download/ExamPaper",
    answerUrl: "https://nta.ac.in/Download/ExamPaper",
    badge: "NEET",
    urgent: true,
  },
  {
    exam: "CUET UG Previous Papers",
    org: "NTA - CUET",
    years: "2022-2024",
    paperCount: "30+ Papers",
    desc: "CUET UG domain-wise previous year papers for Central University admissions",
    paperUrl: "https://cuet.samarth.ac.in",
    answerUrl: "https://cuet.samarth.ac.in",
    badge: "CUET",
  },
];

const upscPYQ: PYQCard[] = [
  {
    exam: "UPSC Civil Services Prelims",
    org: "UPSC",
    years: "2011-2024",
    paperCount: "28+ Papers",
    desc: "UPSC IAS Prelims GS Paper 1 & Paper 2 (CSAT) with official answer keys",
    paperUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    answerUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    badge: "IAS Prelims",
    urgent: true,
  },
  {
    exam: "UPSC Civil Services Mains",
    org: "UPSC",
    years: "2013-2024",
    paperCount: "24+ Papers",
    desc: "UPSC Mains GS 1, 2, 3, 4 and Optional subject previous year question papers",
    paperUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    answerUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    badge: "IAS Mains",
  },
  {
    exam: "UPSC NDA Previous Year Papers",
    org: "UPSC",
    years: "2015-2024",
    paperCount: "20+ Papers",
    desc: "NDA & NA exam Maths and General Ability Test previous year papers with solutions",
    paperUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    answerUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    badge: "NDA",
  },
  {
    exam: "UPSC CDS Previous Papers",
    org: "UPSC",
    years: "2015-2024",
    paperCount: "20+ Papers",
    desc: "Combined Defence Services previous year question papers with official answer keys",
    paperUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    answerUrl: "https://upsc.gov.in/examinations/previous-question-papers",
    badge: "CDS",
  },
];

const sscRailwayPYQ: PYQCard[] = [
  {
    exam: "SSC CGL Previous Year Papers",
    org: "Staff Selection Commission",
    years: "2015-2024",
    paperCount: "60+ Papers",
    desc: "SSC CGL Tier 1 & Tier 2 previous year question papers with official answer keys",
    paperUrl: "https://ssc.nic.in/Portal/QuestionPapers",
    answerUrl: "https://ssc.nic.in/Portal/QuestionPapers",
    badge: "SSC CGL",
    urgent: true,
  },
  {
    exam: "SSC CHSL Previous Papers",
    org: "Staff Selection Commission",
    years: "2016-2024",
    paperCount: "40+ Papers",
    desc: "SSC CHSL 10+2 Tier 1 & 2 previous year question papers and answer keys",
    paperUrl: "https://ssc.nic.in/Portal/QuestionPapers",
    answerUrl: "https://ssc.nic.in/Portal/QuestionPapers",
    badge: "SSC CHSL",
  },
  {
    exam: "SSC MTS Previous Papers",
    org: "Staff Selection Commission",
    years: "2017-2024",
    paperCount: "30+ Papers",
    desc: "SSC MTS (Multi Tasking Staff) previous year question papers with solution keys",
    paperUrl: "https://ssc.nic.in/Portal/QuestionPapers",
    answerUrl: "https://ssc.nic.in/Portal/QuestionPapers",
    badge: "SSC MTS",
  },
  {
    exam: "RRB NTPC Previous Papers",
    org: "Railway Recruitment Board",
    years: "2016-2024",
    paperCount: "50+ Papers",
    desc: "RRB NTPC CBT Stage 1 & Stage 2 previous year question papers with answer keys",
    paperUrl: "https://indianrailways.gov.in",
    answerUrl: "https://indianrailways.gov.in",
    badge: "RRB NTPC",
    urgent: true,
  },
  {
    exam: "RRB Group D Previous Papers",
    org: "Railway Recruitment Board",
    years: "2018-2024",
    paperCount: "30+ Papers",
    desc: "Railway Group D CBT previous year question papers with official answer keys",
    paperUrl: "https://indianrailways.gov.in",
    answerUrl: "https://indianrailways.gov.in",
    badge: "RRB Group D",
  },
  {
    exam: "RRB ALP Previous Year Papers",
    org: "Railway Recruitment Board",
    years: "2018-2024",
    paperCount: "20+ Papers",
    desc: "Assistant Loco Pilot Stage 1 & 2 previous year papers with official answer keys",
    paperUrl: "https://indianrailways.gov.in",
    answerUrl: "https://indianrailways.gov.in",
    badge: "RRB ALP",
  },
];

const biharPolicePYQ: PYQCard[] = [
  {
    exam: "Bihar Police Constable Papers",
    org: "CSBC Bihar",
    years: "2018-2024",
    paperCount: "10+ Papers",
    desc: "Bihar Police Constable previous year question papers with official answer keys - CSBC",
    paperUrl: "https://csbc.bih.nic.in",
    answerUrl: "https://csbc.bih.nic.in",
    badge: "Bihar Police",
    urgent: true,
  },
  {
    exam: "Bihar Police SI Previous Papers",
    org: "BPSSC Bihar",
    years: "2017-2024",
    paperCount: "8+ Papers",
    desc: "Bihar Police Sub-Inspector (SI) previous year papers with official answer keys",
    paperUrl: "https://bpssc.bih.nic.in",
    answerUrl: "https://bpssc.bih.nic.in",
    badge: "Bihar Police SI",
  },
  {
    exam: "BPSC Previous Year Papers",
    org: "Bihar Public Service Commission",
    years: "2015-2024",
    paperCount: "20+ Papers",
    desc: "BPSC Prelims & Mains previous year papers with official answer keys and solutions",
    paperUrl: "https://bpsc.bih.nic.in",
    answerUrl: "https://bpsc.bih.nic.in",
    badge: "BPSC",
    urgent: true,
  },
  {
    exam: "Bihar Board Matric Previous Papers",
    org: "BSEB Bihar",
    years: "2018-2024",
    paperCount: "15+ Papers",
    desc: "Bihar Board Class 10 (Matric) previous year papers with model answers",
    paperUrl: "https://biharboardonline.bihar.gov.in",
    answerUrl: "https://biharboardonline.bihar.gov.in",
    badge: "Bihar Board 10",
  },
  {
    exam: "Bihar Board Intermediate Papers",
    org: "BSEB Bihar",
    years: "2018-2024",
    paperCount: "15+ Papers",
    desc: "Bihar Board Class 12 (Intermediate) previous year papers Science/Commerce/Arts",
    paperUrl: "https://biharboardonline.bihar.gov.in",
    answerUrl: "https://biharboardonline.bihar.gov.in",
    badge: "Bihar Board 12",
  },
];

function PYQCard({ card, idx }: { card: PYQCard; idx: number }) {
  const { t } = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
    >
      <Card className="card-hover border border-border/50 h-full flex flex-col overflow-hidden">
        {card.urgent && <div className="h-1.5 bg-destructive" />}
        {!card.urgent && (
          <div
            className="h-1.5"
            style={{ background: "oklch(0.22 0.12 260)" }}
          />
        )}
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-bold text-sm text-foreground leading-tight">
              {card.exam}
            </h3>
            {card.urgent && (
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] shrink-0 flex items-center gap-1">
                <Siren className="h-2.5 w-2.5" /> Hot
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-1">{card.org}</p>
          <p className="text-xs text-foreground/75 mb-3 flex-1 line-clamp-2">
            {card.desc}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: "oklch(0.22 0.12 260 / 0.06)" }}
            >
              <p className="text-[10px] text-muted-foreground">Years</p>
              <p className="text-xs font-semibold text-foreground">
                {card.years}
              </p>
            </div>
            <div
              className="p-2 rounded-lg"
              style={{ background: "oklch(0.56 0.18 145 / 0.06)" }}
            >
              <p className="text-[10px] text-muted-foreground">Papers</p>
              <p className="text-xs font-semibold text-foreground">
                {card.paperCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <Badge
              className="text-[10px] px-1.5 py-0"
              style={{
                background: "oklch(0.72 0.18 55 / 0.1)",
                color: "oklch(0.55 0.18 55)",
                borderColor: "oklch(0.72 0.18 55 / 0.3)",
              }}
            >
              {card.badge}
            </Badge>
            <span className="badge-govt text-[10px]">✅ Official Source</span>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 gap-1.5 text-xs font-semibold"
              size="sm"
              style={{ background: "oklch(0.22 0.12 260)", color: "white" }}
              onClick={() => window.open(card.paperUrl, "_blank")}
              data-ocid={`pyq.paper.button.${idx + 1}`}
            >
              <FileText className="h-3.5 w-3.5" />
              {t("Question Paper", "Question Paper")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 text-xs"
              style={{
                borderColor: "oklch(0.56 0.18 145 / 0.4)",
                color: "oklch(0.35 0.15 145)",
              }}
              onClick={() => window.open(card.answerUrl, "_blank")}
              data-ocid={`pyq.answer.button.${idx + 1}`}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              {t("Answer Key", "Answer Key")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PreviousYearPage() {
  const { t } = useAppContext();

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
              <ClipboardList
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t(
                  "Previous Year Papers & Answer Keys",
                  "Previous Year Papers & Answer Keys",
                )}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "CBSE, JEE, NEET, UPSC, SSC, Railway, Bihar Police - Official Sources",
                "CBSE, JEE, NEET, UPSC, SSC, Railway, Bihar Police - Official Sources",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Official Sources Only</span>
              <span className="badge-govt">📄 Free PDF Download</span>
              <span className="badge-made-in-india">
                🇮🇳 Government of India
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="board">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8 h-auto gap-1">
            <TabsTrigger
              value="board"
              className="gap-1 text-xs py-2"
              data-ocid="pyq.board.tab"
            >
              <BookOpen className="h-3 w-3" />
              {t("Board Exams", "Board Exams")}
            </TabsTrigger>
            <TabsTrigger
              value="jeeneet"
              className="gap-1 text-xs py-2"
              data-ocid="pyq.jeeneet.tab"
            >
              <GraduationCap className="h-3 w-3" />
              {t("JEE & NEET", "JEE & NEET")}
            </TabsTrigger>
            <TabsTrigger
              value="upsc"
              className="gap-1 text-xs py-2"
              data-ocid="pyq.upsc.tab"
            >
              <Shield className="h-3 w-3" />
              {t("UPSC", "UPSC")}
            </TabsTrigger>
            <TabsTrigger
              value="sscrailway"
              className="gap-1 text-xs py-2"
              data-ocid="pyq.sscrailway.tab"
            >
              <FileText className="h-3 w-3" />
              {t("SSC & Railway", "SSC & Railway")}
            </TabsTrigger>
            <TabsTrigger
              value="bihar"
              className="gap-1 text-xs py-2"
              data-ocid="pyq.bihar.tab"
            >
              <ClipboardList className="h-3 w-3" />
              {t("Bihar Police", "Bihar Police")}
            </TabsTrigger>
          </TabsList>

          {/* Board Exams Tab */}
          <TabsContent value="board">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.72 0.18 55 / 0.3)",
                background: "oklch(0.72 0.18 55 / 0.04)",
              }}
            >
              <Shield
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  CBSE Official - Board Exam Papers
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi papers cbse.gov.in aur cbseacademic.nic.in se hain -
                  100% official aur free.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {boardExamPYQ.map((card, idx) => (
                <PYQCard key={card.exam} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* JEE NEET Tab */}
          <TabsContent value="jeeneet">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.22 0.12 260 / 0.3)",
                background: "oklch(0.22 0.12 260 / 0.04)",
              }}
            >
              <GraduationCap
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.22 0.12 260)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  NTA Official - JEE Main, JEE Advanced, NEET Papers
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi papers nta.ac.in aur jeeadv.ac.in se hain - official
                  question papers & answer keys.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {jeeNeetPYQ.map((card, idx) => (
                <PYQCard key={card.exam} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* UPSC Tab */}
          <TabsContent value="upsc">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.56 0.18 145 / 0.3)",
                background: "oklch(0.56 0.18 145 / 0.04)",
              }}
            >
              <Shield
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.56 0.18 145)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  UPSC Official - Civil Services, NDA, CDS Papers
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi papers upsc.gov.in se hain - IAS, IPS, NDA, CDS official
                  previous year papers.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upscPYQ.map((card, idx) => (
                <PYQCard key={card.exam} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* SSC & Railway Tab */}
          <TabsContent value="sscrailway">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.72 0.18 55 / 0.3)",
                background: "oklch(0.72 0.18 55 / 0.04)",
              }}
            >
              <FileText
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  SSC & RRB Official - CGL, CHSL, NTPC, Group D Papers
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi papers ssc.nic.in aur indianrailways.gov.in se hain -
                  official question papers & answer keys.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sscRailwayPYQ.map((card, idx) => (
                <PYQCard key={card.exam} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* Bihar Police Tab */}
          <TabsContent value="bihar">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.56 0.18 145 / 0.3)",
                background: "oklch(0.56 0.18 145 / 0.04)",
              }}
            >
              <ClipboardList
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.56 0.18 145)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  Bihar Police, BPSC & Bihar Board Official Papers
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi papers csbc.bih.nic.in, bpsc.bih.nic.in aur
                  biharboardonline.bihar.gov.in se hain.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {biharPolicePYQ.map((card, idx) => (
                <PYQCard key={card.exam} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Disclaimer */}
        <div className="mt-10 p-5 rounded-2xl border border-border/50 bg-muted/30">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {t(
                "Gyan Tarang पर सभी Previous Year Papers के links CBSE (cbse.gov.in), NTA (nta.ac.in), UPSC (upsc.gov.in), SSC (ssc.nic.in), RRB (indianrailways.gov.in), CSBC (csbc.bih.nic.in) जैसी official government websites के direct links हैं। Gyan Tarang किसी third-party या paid content को promote नहीं करता। हमेशा official websites पर जाएं।",
                "All Previous Year Paper links on Gyan Tarang are direct links from official government websites like CBSE, NTA, UPSC, SSC, RRB, CSBC. Gyan Tarang does not promote any third-party or paid content. Always visit official websites.",
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
