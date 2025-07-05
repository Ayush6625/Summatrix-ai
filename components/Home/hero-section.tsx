import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { MotionDiv, MotionH1, MotionH2, MotionSection, MotionSpan } from "@/components/common/motion-wrap";
import { containerVariants, itemVariants } from "@/utils/constant";
import { scale } from "motion/react";

const buttonVariants = {
  scale:1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping:10,
  }

}

export default function HeroSection() {
  return (
    <MotionSection 
    variants={containerVariants} 
    initial="hidden" 
    animate="visible" 
    className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <MotionDiv 
      variants={itemVariants}
      className="relative p-px overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group mb-4">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-3 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
        >
          <Sparkles className="h-5 w-5 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </MotionDiv>

      <MotionH1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center py-6">
        Transform PDFs into{" "}
        <span className="relative inline-block px-2">
          <MotionSpan variants={buttonVariants}
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></MotionSpan>
          <span className="relative z-10">concise</span>
        </span>{" "}
        summaries
      </MotionH1>

      <MotionH2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds
      </MotionH2>

      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button className="bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 py-6 font-bold shadow-lg transition-all duration-300">
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Try Summatrix</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
