// summary-viewer.tsx
"use client";

import { useState, useMemo } from "react";
import { Card } from "../ui/card"; // Assuming this path is correct
import { NavigationControls } from "@/components/summaries/navigation-control";
import ProgressBar from "@/components/summaries/progress-bar";
import { parseSection } from "@/utils/summery-helpers"; // Ensure this import path is correct
import ContentSection from "./content-section"; // Ensure this import path is correct for ContentSection

// Define an interface for the parsed section structure for better type safety
interface SummarySection {
  title: string;
  points: string[];
}

// Moved parseEmojiPoint here so it can be reused by SummaryViewer and ContentSection.
// Alternatively, place it in a shared utility file.
function parseEmojiPoint(content: string) {
  const cleanContent = content.trim();
  // Regex to match one or more emojis at the start, followed by optional spaces, then the rest of the text
  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.*)$/u);

  if (!matches) {
    return { emoji: null, text: content.trim() };
  }

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}


// SectionTitle component updated to handle emoji from the title prop
const SectionTitle = ({ title }: { title: string }) => {
  const { emoji, text } = parseEmojiPoint(title); // Parse the title for emoji

  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {emoji && <span className="text-4xl mr-2">{emoji}</span>} {/* Display the title emoji */}
        {text} {/* Display the rest of the title text */}
      </h2>
    </div>
  );
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Memoize the parsing of sections for performance
  const sections: SummarySection[] = useMemo(() => {
    // Make sure your summary string and parseSection handle titles correctly.
    // The `\n# ` split implies that each new section starts with `# `.
    return `\n${summary}` // Prepend newline to ensure the first section is also split correctly
      .split("\n# ") // Split by '# ' to get individual sections
      .map((section) => section.trim()) // Trim whitespace from each section string
      .filter(Boolean) // Remove any empty strings (e.g., if summary starts with # )
      .map(parseSection); // Process each section string with your parseSection utility
  }, [summary]); // Recalculate only when 'summary' prop changes

  const totalSections = sections.length;

  const handlePrevious = () =>
    setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));

  const handleNext = () =>
    setCurrentSectionIndex((prev) => Math.min(prev + 1, totalSections - 1));

  const handleSelectionSelect = (index: number) =>
    setCurrentSectionIndex(Math.min(Math.max(index, 0), totalSections - 1));

  if (totalSections === 0) {
    return (
      <p className="text-gray-500 text-center py-4">No summary available</p>
    );
  }

  // Get the current section to display
  const currentSection = sections[currentSectionIndex];

  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-gradient-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      {/* Pass 'section' (all sections) and 'currentSection' (index) to ProgressBar */}
      <ProgressBar section={sections} currentSection={currentSectionIndex} />

      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          {/* SectionTitle now handles parsing its own title for the emoji */}
          <SectionTitle title={currentSection?.title || ''} />

          {/* ContentSection will only receive and render the bullet points */}
          <ContentSection
            title={currentSection?.title || ''} // Still pass title if ContentSection requires it, even if not rendered directly
            points={currentSection?.points || []} // Pass only the points for content cards
          />
        </div>
      </div>

      <NavigationControls
        currentSection={currentSectionIndex}
        totalSections={totalSections}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={handleSelectionSelect}
      />
    </Card>
  );
}