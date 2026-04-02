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
  ChevronRight,
  Clock,
  GraduationCap,
  RefreshCcw,
  Shield,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface ExamConfig {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  color: string;
  questions: Question[];
  timeMinutes: number;
}

const examConfigs: ExamConfig[] = [
  {
    id: "cbse-10",
    name: "CBSE Class 10",
    nameHi: "CBSE कक्षा 10",
    icon: "📚",
    color: "oklch(0.76 0.12 350)",
    timeMinutes: 15,
    questions: [
      {
        q: "What is the value of (2³ × 2²)?",
        options: ["2⁵", "4⁵", "2⁶", "8⁵"],
        answer: 0,
        explanation:
          "2³ × 2² = 2^(3+2) = 2⁵ = 32 (Law of exponents: aᵐ × aⁿ = aᵐ⁺ⁿ)",
      },
      {
        q: "Which of these is NOT a factor of 12?",
        options: ["1", "4", "5", "6"],
        answer: 2,
        explanation:
          "Factors of 12: 1, 2, 3, 4, 6, 12. 5 divides 12 with remainder, so 5 is NOT a factor.",
      },
      {
        q: "If triangle ABC is similar to triangle PQR, then what is the ratio of their areas if AB/PQ = 3/4?",
        options: ["3/4", "9/16", "4/3", "16/9"],
        answer: 1,
        explanation:
          "Area ratio = (corresponding sides ratio)² = (3/4)² = 9/16",
      },
      {
        q: "The distance between points (2, 3) and (6, 6) is:",
        options: ["5", "4", "3", "7"],
        answer: 0,
        explanation: "Distance = √[(6-2)² + (6-3)²] = √[16+9] = √25 = 5",
      },
      {
        q: "What is the HCF of 18 and 24?",
        options: ["4", "6", "8", "12"],
        answer: 1,
        explanation: "18 = 2×3², 24 = 2³×3. HCF = 2×3 = 6",
      },
      {
        q: "The chemical formula of water is:",
        options: ["HO₂", "H₂O₂", "H₂O", "H₃O"],
        answer: 2,
        explanation: "Water = H₂O (2 hydrogen + 1 oxygen atoms)",
      },
      {
        q: "In which organelle does photosynthesis occur?",
        options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
        answer: 2,
        explanation:
          "Photosynthesis occurs in chloroplasts, which contain chlorophyll pigment.",
      },
      {
        q: "Who wrote 'Discovery of India'?",
        options: [
          "M.K. Gandhi",
          "Jawaharlal Nehru",
          "B.R. Ambedkar",
          "Subhas Chandra Bose",
        ],
        answer: 1,
        explanation:
          "'The Discovery of India' was written by Jawaharlal Nehru in 1946 while in Ahmednagar Fort prison.",
      },
      {
        q: "The largest planet in our Solar System is:",
        options: ["Saturn", "Uranus", "Neptune", "Jupiter"],
        answer: 3,
        explanation:
          "Jupiter is the largest planet, with a diameter of about 143,000 km.",
      },
      {
        q: "English: Choose the correct form - 'She _____ to school every day.'",
        options: ["go", "goes", "going", "gone"],
        answer: 1,
        explanation:
          "Third person singular (She/He/It) takes 's/es' in simple present tense. So 'goes' is correct.",
      },
    ],
  },
  {
    id: "jee",
    name: "JEE Main Practice",
    nameHi: "JEE Main अभ्यास",
    icon: "🔬",
    color: "oklch(0.62 0.28 340)",
    timeMinutes: 15,
    questions: [
      {
        q: "The derivative of sin(x) with respect to x is:",
        options: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"],
        answer: 1,
        explanation:
          "d/dx(sin x) = cos x. This is a fundamental derivative formula.",
      },
      {
        q: "If f(x) = x³ - 3x + 2, then f'(1) = ?",
        options: ["0", "1", "2", "3"],
        answer: 0,
        explanation: "f'(x) = 3x² - 3. f'(1) = 3(1)² - 3 = 3 - 3 = 0",
      },
      {
        q: "The unit of electric current is:",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 1,
        explanation:
          "Electric current is measured in Amperes (A). Volt = potential, Ohm = resistance, Watt = power.",
      },
      {
        q: "Newton's second law: F = ma. If m = 5 kg and a = 3 m/s², then F = ?",
        options: ["8 N", "15 N", "2 N", "12 N"],
        answer: 1,
        explanation: "F = ma = 5 × 3 = 15 Newtons",
      },
      {
        q: "The hybridization of carbon in CH₄ (Methane) is:",
        options: ["sp", "sp²", "sp³", "sp³d"],
        answer: 2,
        explanation:
          "Carbon in CH₄ forms 4 single bonds → sp³ hybridization (tetrahedral geometry).",
      },
      {
        q: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "3"],
        answer: 1,
        explanation: "pH 7 is neutral. pH < 7 is acidic, pH > 7 is basic.",
      },
      {
        q: "∫x² dx = ?",
        options: ["x³ + C", "x³/3 + C", "2x + C", "x²/2 + C"],
        answer: 1,
        explanation: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C. So ∫x² dx = x³/3 + C",
      },
      {
        q: "Which of these is the formula for kinetic energy?",
        options: ["mgh", "½mv²", "F×d", "ma"],
        answer: 1,
        explanation:
          "KE = ½mv² (m = mass, v = velocity). mgh = potential energy.",
      },
      {
        q: "The atomic number of Oxygen is:",
        options: ["6", "7", "8", "9"],
        answer: 2,
        explanation:
          "Oxygen (O) has atomic number 8 (8 protons). Carbon=6, Nitrogen=7, Fluorine=9.",
      },
      {
        q: "sin²θ + cos²θ = ?",
        options: ["0", "2", "1", "sin(2θ)"],
        answer: 2,
        explanation:
          "sin²θ + cos²θ = 1 is the fundamental Pythagorean trigonometric identity.",
      },
    ],
  },
  {
    id: "neet",
    name: "NEET Practice",
    nameHi: "NEET अभ्यास",
    icon: "🩺",
    color: "oklch(0.65 0.22 340)",
    timeMinutes: 15,
    questions: [
      {
        q: "The powerhouse of the cell is:",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
        answer: 2,
        explanation:
          "Mitochondria produces ATP (energy) through cellular respiration, hence called 'powerhouse of cell'.",
      },
      {
        q: "DNA replication occurs in which phase of cell cycle?",
        options: ["G1 phase", "S phase", "G2 phase", "M phase"],
        answer: 1,
        explanation:
          "DNA replication occurs in S phase (Synthesis phase) of interphase.",
      },
      {
        q: "Which gas is released during photosynthesis?",
        options: ["CO₂", "H₂", "O₂", "N₂"],
        answer: 2,
        explanation:
          "6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂. Oxygen is released as a byproduct.",
      },
      {
        q: "The number of chromosomes in a human somatic cell is:",
        options: ["23", "46", "44", "48"],
        answer: 1,
        explanation:
          "Humans have 46 chromosomes (23 pairs) in somatic (body) cells. Gametes have 23.",
      },
      {
        q: "Which organ produces insulin?",
        options: ["Liver", "Kidney", "Pancreas", "Thyroid"],
        answer: 2,
        explanation:
          "Insulin is produced by beta cells of islets of Langerhans in the pancreas.",
      },
      {
        q: "The pH of blood is approximately:",
        options: ["6.5", "7.0", "7.4", "8.0"],
        answer: 2,
        explanation:
          "Normal blood pH is 7.35-7.45 (slightly alkaline), average ~7.4.",
      },
      {
        q: "Darwin's theory is about:",
        options: [
          "Cell theory",
          "Natural selection",
          "Germ theory",
          "Atomic theory",
        ],
        answer: 1,
        explanation:
          "Darwin's theory of evolution by Natural Selection - survival of the fittest.",
      },
      {
        q: "Mendel's laws are related to:",
        options: [
          "Cell division",
          "DNA structure",
          "Inheritance of traits",
          "Protein synthesis",
        ],
        answer: 2,
        explanation:
          "Gregor Mendel's laws describe inheritance of traits from parents to offspring.",
      },
      {
        q: "Which vitamin is produced by skin when exposed to sunlight?",
        options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
        answer: 3,
        explanation:
          "Vitamin D (calciferol) is produced in skin when exposed to UV rays from sunlight.",
      },
      {
        q: "Blood type is determined by which component?",
        options: [
          "Plasma proteins",
          "Antigens on RBC surface",
          "Hemoglobin",
          "White blood cells",
        ],
        answer: 1,
        explanation:
          "ABO blood type is determined by antigens (A or B) on the surface of red blood cells.",
      },
    ],
  },
  {
    id: "upsc",
    name: "UPSC Practice",
    nameHi: "UPSC अभ्यास",
    icon: "🏛️",
    color: "oklch(0.70 0.18 220)",
    timeMinutes: 15,
    questions: [
      {
        q: "The Indian Constitution was adopted on:",
        options: [
          "15 August 1947",
          "26 January 1950",
          "26 November 1949",
          "2 October 1950",
        ],
        answer: 2,
        explanation:
          "Constitution was adopted on 26 November 1949 (Constitution Day). It came into effect on 26 January 1950.",
      },
      {
        q: "Who is called the 'Father of the Indian Constitution'?",
        options: [
          "M.K. Gandhi",
          "Jawaharlal Nehru",
          "B.R. Ambedkar",
          "Sardar Patel",
        ],
        answer: 2,
        explanation:
          "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is called 'Father of the Indian Constitution'.",
      },
      {
        q: "The Preamble of the Indian Constitution describes India as:",
        options: [
          "Federal Republic",
          "Sovereign Socialist Secular Democratic Republic",
          "Union of States",
          "Parliamentary Democracy",
        ],
        answer: 1,
        explanation:
          "The Preamble declares India a 'Sovereign Socialist Secular Democratic Republic' (after 42nd Amendment 1976).",
      },
      {
        q: "Which Article of the Constitution abolishes untouchability?",
        options: ["Article 14", "Article 17", "Article 21", "Article 32"],
        answer: 1,
        explanation:
          "Article 17 abolishes untouchability and makes its practice in any form a punishable offense.",
      },
      {
        q: "The Rajya Sabha is a:",
        options: [
          "Temporary House",
          "Permanent House",
          "Lower House",
          "People's House",
        ],
        answer: 1,
        explanation:
          "Rajya Sabha is the Upper House of Parliament. It is a permanent body - cannot be dissolved (1/3 members retire every 2 years).",
      },
      {
        q: "Which river is known as 'Sorrow of Bihar'?",
        options: ["Ganga", "Brahmaputra", "Kosi", "Son"],
        answer: 2,
        explanation:
          "River Kosi is called 'Sorrow of Bihar' due to frequent flooding that causes damage every year.",
      },
      {
        q: "The Non-Cooperation Movement was launched in:",
        options: ["1919", "1920", "1921", "1922"],
        answer: 1,
        explanation:
          "Gandhi launched the Non-Cooperation Movement in 1920 after the Jallianwala Bagh massacre (1919).",
      },
      {
        q: "Which among the following is NOT a Fundamental Right?",
        options: [
          "Right to Equality",
          "Right to Work",
          "Right to Freedom",
          "Right to Education",
        ],
        answer: 1,
        explanation:
          "Right to Work is not a Fundamental Right. It is a Directive Principle of State Policy (Article 41).",
      },
      {
        q: "The Comptroller and Auditor General of India is appointed by:",
        options: ["Prime Minister", "President", "Chief Justice", "Parliament"],
        answer: 1,
        explanation:
          "CAG (Article 148) is appointed by the President of India on advice of PM.",
      },
      {
        q: "Which schedule of the Constitution lists languages?",
        options: [
          "6th Schedule",
          "7th Schedule",
          "8th Schedule",
          "9th Schedule",
        ],
        answer: 2,
        explanation:
          "8th Schedule lists 22 official languages of India (originally 14, now 22 after amendments).",
      },
    ],
  },
  {
    id: "ssc",
    name: "SSC CGL Practice",
    nameHi: "SSC CGL अभ्यास",
    icon: "📋",
    color: "oklch(0.65 0.18 30)",
    timeMinutes: 15,
    questions: [
      {
        q: "If a train travels 360 km in 6 hours, what is its speed in km/h?",
        options: ["50", "55", "60", "65"],
        answer: 2,
        explanation: "Speed = Distance/Time = 360/6 = 60 km/h",
      },
      {
        q: "Find the missing number: 2, 4, 8, 16, ?, 64",
        options: ["24", "32", "36", "28"],
        answer: 1,
        explanation:
          "Series doubles each time: 2×2=4, 4×2=8, 8×2=16, 16×2=32, 32×2=64",
      },
      {
        q: "If BOOK is coded as CPPM, then FIRE will be coded as?",
        options: ["GJSF", "GJUF", "GKSF", "GHSE"],
        answer: 0,
        explanation: "Each letter is shifted by 1. F→G, I→J, R→S, E→F = GJSF",
      },
      {
        q: "A shopkeeper buys goods for ₹800 and sells for ₹1000. Profit%?",
        options: ["20%", "25%", "15%", "30%"],
        answer: 1,
        explanation: "Profit = 200, Profit% = (200/800)×100 = 25%",
      },
      {
        q: "Choose the correctly spelled word:",
        options: ["Accomodate", "Accommodate", "Accommadate", "Acomodate"],
        answer: 1,
        explanation:
          "'Accommodate' is the correct spelling - two 'c's and two 'm's.",
      },
      {
        q: "The capital of Rajasthan is:",
        options: ["Jodhpur", "Udaipur", "Jaipur", "Ajmer"],
        answer: 2,
        explanation: "Jaipur (Pink City) is the capital of Rajasthan.",
      },
      {
        q: "Select the antonym of 'ANCIENT':",
        options: ["Old", "Modern", "Historical", "Classic"],
        answer: 1,
        explanation:
          "ANCIENT means old/historic. Antonym = MODERN (new/current)",
      },
      {
        q: "If 3x + 7 = 22, what is x?",
        options: ["3", "4", "5", "6"],
        answer: 2,
        explanation: "3x = 22 - 7 = 15; x = 15/3 = 5",
      },
      {
        q: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        answer: 2,
        explanation: "Mercury is the closest planet to the Sun.",
      },
      {
        q: "Simple Interest on ₹2000 at 5% per annum for 3 years?",
        options: ["₹250", "₹300", "₹350", "₹400"],
        answer: 1,
        explanation: "SI = P×R×T/100 = 2000×5×3/100 = ₹300",
      },
    ],
  },
  {
    id: "banking",
    name: "Banking (IBPS/SBI)",
    nameHi: "Banking परीक्षा",
    icon: "🏦",
    color: "oklch(0.55 0.15 180)",
    timeMinutes: 15,
    questions: [
      {
        q: "RBI was established in which year?",
        options: ["1935", "1947", "1951", "1969"],
        answer: 0,
        explanation:
          "Reserve Bank of India was established on 1 April 1935 under RBI Act 1934.",
      },
      {
        q: "What does NEFT stand for?",
        options: [
          "National Electronic Fund Transfer",
          "National Economy Fund Transfer",
          "Net Electronic Financial Transfer",
          "National Electronic Fiscal Transfer",
        ],
        answer: 0,
        explanation:
          "NEFT = National Electronic Funds Transfer - used for electronic money transfer.",
      },
      {
        q: "CRR stands for:",
        options: [
          "Cash Reserve Ratio",
          "Credit Reserve Rate",
          "Central Reserve Ratio",
          "Cash Refinance Rate",
        ],
        answer: 0,
        explanation:
          "CRR (Cash Reserve Ratio) is the percentage of deposits banks must keep with RBI.",
      },
      {
        q: "The headquarters of RBI is in:",
        options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: 1,
        explanation:
          "RBI headquarters is in Mumbai (Fort area). It was established in Kolkata, moved to Mumbai in 1937.",
      },
      {
        q: "What is compound interest on ₹1000 at 10% for 2 years?",
        options: ["₹200", "₹210", "₹205", "₹215"],
        answer: 1,
        explanation:
          "CI = P[(1+r/100)ⁿ - 1] = 1000[(1.1)² - 1] = 1000[1.21-1] = 1000×0.21 = ₹210",
      },
      {
        q: "IMPS stands for:",
        options: [
          "Immediate Payment Service",
          "Internet Mobile Payment System",
          "Instant Money Processing Service",
          "India Mobile Payment System",
        ],
        answer: 0,
        explanation:
          "IMPS = Immediate Payment Service - 24×7 instant interbank electronic fund transfer.",
      },
      {
        q: "What is the full form of NPA?",
        options: [
          "Non-Performing Asset",
          "Net Profit Amount",
          "National Portfolio Asset",
          "New Payment Asset",
        ],
        answer: 0,
        explanation:
          "NPA = Non-Performing Asset - a loan where borrower has not paid principal or interest for 90+ days.",
      },
      {
        q: "SLR in banking refers to:",
        options: [
          "Statutory Liquidity Ratio",
          "Standard Lending Rate",
          "Sovereign Liquidity Reserve",
          "Scheduled Lending Ratio",
        ],
        answer: 0,
        explanation:
          "SLR = Statutory Liquidity Ratio - percentage of deposits banks must maintain in gold/govt securities.",
      },
      {
        q: "The term 'Repo Rate' refers to:",
        options: [
          "Rate at which banks borrow from RBI",
          "Rate at which RBI borrows from banks",
          "Retail lending rate",
          "Foreign exchange rate",
        ],
        answer: 0,
        explanation:
          "Repo Rate is the rate at which RBI lends money to commercial banks (repurchase agreement).",
      },
      {
        q: "KYC stands for:",
        options: [
          "Know Your Customer",
          "Keep Your Cash",
          "Key Your Code",
          "Know Your Currency",
        ],
        answer: 0,
        explanation:
          "KYC = Know Your Customer - mandatory process to verify customer identity in banking.",
      },
    ],
  },
  {
    id: "railway",
    name: "Railway (RRB)",
    nameHi: "Railway अभ्यास",
    icon: "🚂",
    color: "oklch(0.50 0.18 30)",
    timeMinutes: 15,
    questions: [
      {
        q: "A train 150m long crosses a pole in 15 seconds. Speed in km/h?",
        options: ["32", "36", "40", "48"],
        answer: 1,
        explanation: "Speed = 150/15 = 10 m/s = 10×18/5 = 36 km/h",
      },
      {
        q: "Indian Railways network length is approximately:",
        options: ["50,000 km", "68,000 km", "80,000 km", "90,000 km"],
        answer: 1,
        explanation:
          "Indian Railways has ~68,000 km of route length, 4th largest network in world.",
      },
      {
        q: "The first railway in India ran between:",
        options: [
          "Delhi-Agra",
          "Bombay-Thane",
          "Calcutta-Siliguri",
          "Madras-Bangalore",
        ],
        answer: 1,
        explanation:
          "First train in India ran from Bombay (Mumbai) to Thane on 16 April 1853.",
      },
      {
        q: "What is the full form of IRCTC?",
        options: [
          "Indian Railway Catering & Tourism Corporation",
          "Indian Rail Corporation & Travel Center",
          "Indian Railway Commerce & Travel Company",
          "India Railway Catering Tourism Channel",
        ],
        answer: 0,
        explanation:
          "IRCTC = Indian Railway Catering and Tourism Corporation - handles ticketing, catering, tourism.",
      },
      {
        q: "Choose the odd one: Train, Bus, Airplane, Bicycle",
        options: ["Train", "Bus", "Airplane", "Bicycle"],
        answer: 3,
        explanation:
          "Train, Bus, Airplane are public transport vehicles with engines. Bicycle is human-powered.",
      },
      {
        q: "If a train runs at 72 km/h, what is its speed in m/s?",
        options: ["18 m/s", "20 m/s", "22 m/s", "24 m/s"],
        answer: 1,
        explanation: "72 km/h × (1000/3600) = 72 × 5/18 = 20 m/s",
      },
      {
        q: "Rajdhani Express connects major cities to:",
        options: ["State capitals", "New Delhi", "Mumbai", "Kolkata"],
        answer: 1,
        explanation:
          "Rajdhani Express trains connect major cities across India to New Delhi.",
      },
      {
        q: "The highest railway station in India is:",
        options: ["Shimla", "Darjeeling", "Ghum", "Manali"],
        answer: 2,
        explanation:
          "Ghum (Ghoom) station in West Bengal at 2258m is the highest railway station in India.",
      },
      {
        q: "Platform tickets are issued to:",
        options: [
          "Passengers only",
          "Non-passengers entering platform",
          "Railway staff only",
          "Senior citizens",
        ],
        answer: 1,
        explanation:
          "Platform tickets are for people (non-passengers) who want to enter the platform area.",
      },
      {
        q: "The word 'TRAIN' rearranged as NRIAT. What could be a word from T,R,A,I,N?",
        options: ["RAIN", "IRAN", "RIANT", "All of these"],
        answer: 3,
        explanation:
          "RAIN (4 letters), IRAN (country name/proper noun), RIANT (adjective meaning cheerful) - all use letters from TRAIN.",
      },
    ],
  },
  {
    id: "bihar-police",
    name: "Bihar Police",
    nameHi: "बिहार पुलिस",
    icon: "👮",
    color: "oklch(0.40 0.15 250)",
    timeMinutes: 15,
    questions: [
      {
        q: "Bihar ki rajdhani kya hai?",
        options: ["Gaya", "Patna", "Bhagalpur", "Muzaffarpur"],
        answer: 1,
        explanation:
          "Patna, Bihar ki rajdhani (capital) hai. Yeh Ganga nadi ke kinare basa hai.",
      },
      {
        q: "Bihar ka sthapit din kab hai?",
        options: ["22 March", "1 November", "26 January", "15 August"],
        answer: 0,
        explanation:
          "Bihar Diwas (Bihar Day) 22 March ko manaya jata hai - 1912 mein Bihar alag state bana tha.",
      },
      {
        q: "IPC Section 302 kisse related hai?",
        options: ["Chor", "Hatya (Murder)", "Danga", "Betabahi"],
        answer: 1,
        explanation:
          "IPC Section 302 - Hatya (Murder) ki saza ka provision karta hai. Mrityu dand ya umra kaid.",
      },
      {
        q: "CrPC ka pura naam kya hai?",
        options: [
          "Criminal Procedure Code",
          "Crime Prevention Code",
          "Central Police Code",
          "Court Rule & Procedure Code",
        ],
        answer: 0,
        explanation:
          "CrPC = Code of Criminal Procedure (Dandik Prasanwidhan Sanhita) - criminal proceedings ka niyam.",
      },
      {
        q: "Who is called the 'Light of Asia'?",
        options: [
          "Mahatma Gandhi",
          "Gautam Buddha",
          "Jawaharlal Nehru",
          "Ashoka",
        ],
        answer: 1,
        explanation:
          "Gautam Buddha is called 'Light of Asia'. He was born in Lumbini (Nepal) and attained enlightenment at Bodh Gaya (Bihar).",
      },
      {
        q: "Nalanda University kahan hai?",
        options: ["Patna", "Gaya", "Rajgir", "Vaishali"],
        answer: 2,
        explanation:
          "Nalanda University Rajgir (Nalanda district, Bihar) mein hai. Ancient world ka sabse bada university tha.",
      },
      {
        q: "Bihar mein Lok Sabha seats kitni hain?",
        options: ["30", "38", "40", "42"],
        answer: 2,
        explanation:
          "Bihar mein 40 Lok Sabha (Parliamentary) seats hain - sabse zyada wale states mein se ek.",
      },
      {
        q: "Sone river kaun se state mein hai?",
        options: [
          "Sirf Bihar mein",
          "Bihar aur Jharkhand mein",
          "Jharkhand, Chhattisgarh, Bihar mein",
          "Bihar aur UP mein",
        ],
        answer: 2,
        explanation:
          "Sone river Chhattisgarh ke jungle se nikalta hai, Jharkhand se guzarta hai, aur Bihar mein Ganga mein milta hai.",
      },
      {
        q: "What is CCTNS in police context?",
        options: [
          "Crime & Criminal Tracking Network System",
          "Central Crime Tracking National System",
          "Computer Crime Technology Network Service",
          "Central Control Technology Network System",
        ],
        answer: 0,
        explanation:
          "CCTNS = Crime and Criminal Tracking Network and Systems - police crime records ka national digital network.",
      },
      {
        q: "IPC ka pura naam kya hai?",
        options: [
          "Indian Penal Code",
          "India Police Code",
          "International Penal Constitution",
          "Indian Police Charter",
        ],
        answer: 0,
        explanation:
          "IPC = Indian Penal Code (1860). Ab Bhartiya Nyaya Sanhita (BNS) 2023 ne ise replace kiya hai.",
      },
    ],
  },
];

type TestState = "select" | "running" | "finished";

export default function MockTestsPage() {
  const { t } = useAppContext();
  const { mutate: saveScore } = useSaveQuizScore();

  const [testState, setTestState] = useState<TestState>("select");
  const [selectedExamId, setSelectedExamId] = useState("cbse-10");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedExam = examConfigs.find((e) => e.id === selectedExamId)!;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTest = () => {
    const exam = examConfigs.find((e) => e.id === selectedExamId)!;
    setSelectedAnswers(new Array(exam.questions.length).fill(null));
    setCurrentQuestion(0);
    setTimeLeft(exam.timeMinutes * 60);
    setTestState("running");
    setShowExplanation(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestState("finished");
  };

  const handleAnswer = (optIdx: number) => {
    if (selectedAnswers[currentQuestion] !== null) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optIdx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < selectedExam.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishTest();
    }
  };

  const calculateScore = () => {
    return selectedAnswers.filter(
      (ans, idx) => ans === selectedExam.questions[idx].answer,
    ).length;
  };

  const handleSubmitScore = () => {
    const score = calculateScore();
    saveScore(BigInt(score), {
      onSuccess: () =>
        toast.success(`Score saved: ${score}/${selectedExam.questions.length}`),
      onError: () => toast.error("Score save karne mein error"),
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const score = calculateScore();
  const percentage = Math.round((score / selectedExam.questions.length) * 100);

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
                {t("Mock Tests", "Mock Tests")}
              </h1>
            </div>
            <p className="text-foreground/70">
              {t(
                "CBSE, JEE, NEET, UPSC, SSC, Banking, Railway, Bihar Police - सरकारी अनुमोदित प्रश्न",
                "CBSE, JEE, NEET, UPSC, SSC, Banking, Railway, Bihar Police - Government approved questions",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Copyright Free</span>
              <span className="badge-govt">📝 Standard Questions</span>
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {/* EXAM SELECTION */}
          {testState === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  {t("Exam चुनें:", "Select Exam:")}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {examConfigs.map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setSelectedExamId(exam.id)}
                      className="p-4 rounded-2xl border text-left transition-all"
                      style={
                        selectedExamId === exam.id
                          ? {
                              background: `${exam.color}15`,
                              border: `2px solid ${exam.color}`,
                              boxShadow: `0 4px 14px ${exam.color}25`,
                            }
                          : {
                              background: "oklch(1 0 0)",
                              border: "1.5px solid oklch(0.88 0.02 260)",
                            }
                      }
                      data-ocid={`mock_tests.exam.${exam.id}.button`}
                    >
                      <div className="text-2xl mb-1">{exam.icon}</div>
                      <div className="font-display font-bold text-sm text-foreground leading-tight">
                        {exam.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {exam.questions.length} Questions • {exam.timeMinutes}{" "}
                        min
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected exam info */}
              <Card className="border border-border/50 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                      style={{ background: `${selectedExam.color}15` }}
                    >
                      {selectedExam.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-black text-foreground mb-1">
                        {selectedExam.name}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{selectedExam.questions.length} Questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedExam.timeMinutes} Minutes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          <span>Copyright Free</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="font-bold gap-2 text-foreground"
                          style={{ background: selectedExam.color }}
                          onClick={startTest}
                          data-ocid="mock_tests.start_button"
                        >
                          <Zap className="h-4 w-4" />
                          {t("Test Shuru Karein", "Start Test")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exam list for quick selection */}
              <div className="mb-3">
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Exam Dropdown:
                </p>
                <Select
                  value={selectedExamId}
                  onValueChange={setSelectedExamId}
                >
                  <SelectTrigger
                    className="w-full md:w-64"
                    data-ocid="mock_tests.exam_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {examConfigs.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.icon} {exam.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* TEST RUNNING */}
          {testState === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Timer & Progress */}
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-foreground text-sm">
                    Q{currentQuestion + 1}/{selectedExam.questions.length}
                  </span>
                  <Badge
                    style={{
                      background: `${selectedExam.color}15`,
                      color: selectedExam.color,
                      border: `1px solid ${selectedExam.color}30`,
                    }}
                  >
                    {selectedExam.name}
                  </Badge>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold"
                  style={{
                    background:
                      timeLeft < 60
                        ? "oklch(0.57 0.25 27 / 0.1)"
                        : "oklch(0.56 0.18 145 / 0.1)",
                    color:
                      timeLeft < 60
                        ? "oklch(0.57 0.25 27)"
                        : "oklch(0.45 0.15 145)",
                  }}
                  data-ocid="mock_tests.timer"
                >
                  <Clock className="h-4 w-4" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              <Progress
                value={
                  ((currentQuestion + 1) / selectedExam.questions.length) * 100
                }
                className="mb-6 h-2"
              />

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border border-border/50 mb-4">
                    <CardContent className="p-6">
                      <div
                        className="p-5 rounded-xl mb-6 border"
                        style={{
                          background: "oklch(0.22 0.12 260 / 0.04)",
                          borderColor: "oklch(0.78 0.18 348 / 0.2)",
                        }}
                      >
                        <p className="font-display font-bold text-lg text-foreground leading-relaxed">
                          {selectedExam.questions[currentQuestion].q}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedExam.questions[currentQuestion].options.map(
                          (opt, idx) => {
                            const answered =
                              selectedAnswers[currentQuestion] !== null;
                            const isSelected =
                              selectedAnswers[currentQuestion] === idx;
                            const isCorrect =
                              idx ===
                              selectedExam.questions[currentQuestion].answer;

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleAnswer(idx)}
                                disabled={answered}
                                className="p-4 rounded-xl border text-left transition-all"
                                style={{
                                  borderColor: answered
                                    ? isCorrect
                                      ? "oklch(0.65 0.22 340)"
                                      : isSelected
                                        ? "oklch(0.57 0.25 27)"
                                        : "oklch(0.88 0.02 260)"
                                    : "oklch(0.88 0.02 260)",
                                  background: answered
                                    ? isCorrect
                                      ? "oklch(0.56 0.18 145 / 0.1)"
                                      : isSelected
                                        ? "oklch(0.57 0.25 27 / 0.1)"
                                        : "white"
                                    : "white",
                                  opacity:
                                    answered && !isCorrect && !isSelected
                                      ? 0.6
                                      : 1,
                                  cursor: answered ? "default" : "pointer",
                                }}
                                data-ocid={`mock_tests.option.${idx + 1}`}
                              >
                                <span className="flex items-center gap-3">
                                  <span
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                    style={{
                                      background:
                                        answered && isCorrect
                                          ? "oklch(0.65 0.22 340)"
                                          : answered && isSelected
                                            ? "oklch(0.57 0.25 27)"
                                            : "oklch(0.92 0.01 80)",
                                      color:
                                        answered && (isCorrect || isSelected)
                                          ? "white"
                                          : "inherit",
                                    }}
                                  >
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  <span className="text-sm font-medium">
                                    {opt}
                                  </span>
                                  {answered && isCorrect && (
                                    <CheckCircle
                                      className="h-4 w-4 ml-auto shrink-0"
                                      style={{ color: "oklch(0.65 0.22 340)" }}
                                    />
                                  )}
                                  {answered && isSelected && !isCorrect && (
                                    <X className="h-4 w-4 ml-auto shrink-0 text-destructive" />
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      </div>

                      {/* Explanation */}
                      {selectedAnswers[currentQuestion] !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 space-y-3"
                        >
                          {!showExplanation ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => setShowExplanation(true)}
                            >
                              <AlertCircle className="h-3.5 w-3.5" />
                              {t("Explanation देखें", "Show Explanation")}
                            </Button>
                          ) : (
                            <div
                              className="p-4 rounded-xl"
                              style={{
                                background: "oklch(0.56 0.18 145 / 0.06)",
                                border: "1px solid oklch(0.56 0.18 145 / 0.2)",
                              }}
                            >
                              <p className="text-xs font-semibold text-foreground mb-1">
                                💡 Explanation:
                              </p>
                              <p className="text-sm text-foreground/80">
                                {
                                  selectedExam.questions[currentQuestion]
                                    .explanation
                                }
                              </p>
                            </div>
                          )}

                          <Button
                            className="w-full font-bold gap-2 text-foreground"
                            style={{ background: selectedExam.color }}
                            onClick={handleNext}
                            data-ocid="mock_tests.next_button"
                          >
                            {currentQuestion < selectedExam.questions.length - 1
                              ? t("अगला सवाल", "Next Question")
                              : t("Test Finish करें", "Finish Test")}
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Quit Button */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-1"
                  onClick={() => setTestState("select")}
                >
                  <X className="h-3.5 w-3.5" />
                  {t("Test Chhod Dein", "Quit Test")}
                </Button>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {testState === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="border border-border/50 overflow-hidden">
                <div
                  className="h-2"
                  style={{ background: selectedExam.color }}
                />
                <CardContent className="p-8 text-center">
                  {/* Score Circle */}
                  <div className="mb-6">
                    <div
                      className="w-32 h-32 rounded-full flex flex-col items-center justify-center mx-auto border-4 mb-4"
                      style={{
                        borderColor: selectedExam.color,
                        background: `${selectedExam.color}10`,
                      }}
                    >
                      <div
                        className="font-display text-4xl font-black"
                        style={{ color: selectedExam.color }}
                      >
                        {score}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        /{selectedExam.questions.length}
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-black text-foreground mb-2">
                      {percentage >= 80
                        ? "🎉 Excellent!"
                        : percentage >= 60
                          ? "👍 Good Job!"
                          : percentage >= 40
                            ? "📚 Keep Practicing!"
                            : "💪 Mehnat Karo!"}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {t(
                        `आपने ${score}/${selectedExam.questions.length} सवाल सही किए (${percentage}%)`,
                        `You scored ${score}/${selectedExam.questions.length} (${percentage}%)`,
                      )}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <Progress value={percentage} className="h-4 mb-6" />

                  {/* Detailed Answers */}
                  <div className="text-left space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {selectedExam.questions.map((q, idx) => (
                      <div
                        key={`result-q-${q.q.slice(0, 15)}-${idx}`}
                        className="flex items-center gap-3 p-3 rounded-xl border text-sm"
                        style={{
                          background:
                            selectedAnswers[idx] === q.answer
                              ? "oklch(0.56 0.18 145 / 0.06)"
                              : "oklch(0.57 0.25 27 / 0.05)",
                          borderColor:
                            selectedAnswers[idx] === q.answer
                              ? "oklch(0.56 0.18 145 / 0.2)"
                              : "oklch(0.57 0.25 27 / 0.2)",
                        }}
                        data-ocid={`mock_tests.result.item.${idx + 1}`}
                      >
                        {selectedAnswers[idx] === q.answer ? (
                          <CheckCircle
                            className="h-4 w-4 shrink-0"
                            style={{ color: "oklch(0.65 0.22 340)" }}
                          />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-destructive" />
                        )}
                        <span className="flex-1 truncate font-medium text-foreground">
                          Q{idx + 1}: {q.q.substring(0, 50)}...
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {selectedAnswers[idx] === q.answer
                            ? "✓ Correct"
                            : `✗ Ans: ${q.options[q.answer].substring(0, 15)}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      className="font-bold gap-2 text-foreground"
                      style={{ background: selectedExam.color }}
                      onClick={() => {
                        handleSubmitScore();
                        setTestState("select");
                      }}
                      data-ocid="mock_tests.submit_button"
                    >
                      <Trophy className="h-4 w-4" />
                      {t("Score Save करें", "Save Score")}
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={startTest}
                      data-ocid="mock_tests.retry_button"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      {t("फिर से करें", "Retry")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="gap-2"
                      onClick={() => setTestState("select")}
                    >
                      {t("दूसरा Test", "Another Test")}
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
