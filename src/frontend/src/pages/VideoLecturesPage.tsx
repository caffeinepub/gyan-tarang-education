import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { ExternalLink, Play, Shield, Video, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const videoData = [
  {
    id: "ncert-class10-science",
    titleHi: "NCERT Class 10 Science",
    titleEn: "NCERT Class 10 Science",
    class: "Class 10",
    subject: "Science",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLIASCOm4FkOeHFnxCdFSBNUhZVWJO8PtU",
    channel: "NCERT Official",
    category: "school",
  },
  {
    id: "ncert-class12-maths",
    titleHi: "NCERT Class 12 Mathematics",
    titleEn: "NCERT Class 12 Mathematics",
    class: "Class 12",
    subject: "Mathematics",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLIASCOm4FkOeoMkHRbDTH3uT1CdWDJYa-",
    channel: "NCERT Official",
    category: "school",
  },
  {
    id: "ncert-class10-maths",
    titleHi: "NCERT Class 10 Mathematics",
    titleEn: "NCERT Class 10 Mathematics",
    class: "Class 10",
    subject: "Mathematics",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLIASCOm4FkOdCKo5-ZQvt_UYBiGfS8V_K",
    channel: "NCERT Official",
    category: "school",
  },
  {
    id: "ncert-class9-science",
    titleHi: "NCERT Class 9 Science",
    titleEn: "NCERT Class 9 Science",
    class: "Class 9",
    subject: "Science",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLIASCOm4FkOd7-RMk3SuK1nROkv6NWZQ7",
    channel: "NCERT Official",
    category: "school",
  },
  {
    id: "ncert-class11-physics",
    titleHi: "NCERT Class 11 Physics",
    titleEn: "NCERT Class 11 Physics",
    class: "Class 11",
    subject: "Physics",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLIASCOm4FkOchZHfJcHMJlJnEJe0eRQxy",
    channel: "NCERT Official",
    category: "school",
  },
  {
    id: "ncert-class12-chemistry",
    titleHi: "NCERT Class 12 Chemistry",
    titleEn: "NCERT Class 12 Chemistry",
    class: "Class 12",
    subject: "Chemistry",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLIASCOm4FkOd4B9JZlMXQMqj-KHidFSSS",
    channel: "NCERT Official",
    category: "school",
  },
];

export default function VideoLecturesPage() {
  const { t } = useAppContext();
  const [selectedVideo, setSelectedVideo] = useState(videoData[0]);

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
              <Video
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("Video Lectures", "Video Lectures")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "NCERT Official YouTube Channel से सरकारी वीडियो लेक्चर - बिल्कुल मुफ्त",
                "Official NCERT video lectures - completely free",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Government Approved</span>
              <span className="badge-govt">📹 Copyright Free</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-400/30">
                <Youtube className="h-3 w-3" /> NCERT Official
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-display font-bold text-foreground mb-4">
              {t("सभी Video Lectures", "All Video Lectures")}
            </h2>
            {videoData.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card
                  className={`cursor-pointer card-hover border transition-all ${
                    selectedVideo.id === video.id
                      ? "border-saffron/50 shadow-saffron/20 shadow-md"
                      : "border-border/50"
                  }`}
                  onClick={() => setSelectedVideo(video)}
                  style={
                    selectedVideo.id === video.id
                      ? { borderColor: "oklch(0.72 0.18 55 / 0.5)" }
                      : {}
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            selectedVideo.id === video.id
                              ? "oklch(0.72 0.18 55)"
                              : "oklch(0.72 0.18 55 / 0.12)",
                        }}
                      >
                        <Play
                          className={`h-4 w-4 ${selectedVideo.id === video.id ? "text-white" : ""}`}
                          style={{
                            color:
                              selectedVideo.id === video.id
                                ? "white"
                                : "oklch(0.72 0.18 55)",
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground leading-tight">
                          {t(video.titleHi, video.titleEn)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {video.class} • {video.subject}
                        </p>
                        <span className="badge-govt text-[10px] mt-1">
                          ✅ Official
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* NCERT Channel Link */}
            <Button
              variant="outline"
              className="w-full gap-2 mt-4"
              onClick={() =>
                window.open("https://www.youtube.com/@ncert_official", "_blank")
              }
            >
              <Youtube className="h-4 w-4 text-red-500" />
              {t("NCERT Official Channel", "NCERT Official Channel")}
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="border border-border/50 overflow-hidden">
              <div className="bg-hero-pattern p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-white">
                      {t(selectedVideo.titleHi, selectedVideo.titleEn)}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {selectedVideo.class} • {selectedVideo.subject}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="badge-govt text-[10px]">
                      ✅ Govt Approved
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/70 border border-white/20">
                      <Shield className="h-2.5 w-2.5" /> Copyright Free
                    </span>
                  </div>
                </div>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.titleEn}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">
                      {selectedVideo.channel}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        selectedVideo.embedUrl.replace(
                          "embed/videoseries?list=",
                          "playlist?list=",
                        ),
                        "_blank",
                      )
                    }
                    className="gap-1.5 text-xs"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t("YouTube पर देखें", "Watch on YouTube")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="mt-4 p-4 rounded-xl border border-india-green/20 bg-india-green/5">
              <div className="flex items-start gap-2">
                <Shield
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.56 0.18 145)" }}
                />
                <p className="text-sm text-foreground/80">
                  {t(
                    "ये सभी videos NCERT के official YouTube channel से हैं। ये सरकारी और copyright-free content है।",
                    "All these videos are from NCERT's official YouTube channel. This is government-approved and copyright-free content.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
