


function parseEmojiPoint(content: string) {
  const cleanContent = content.trim();
 
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


function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^[A-Z]/.test(point); 
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{1F600}-\u{1F64F}\u{1F000}-\u{1F02F}\u{2B00}-\u{2BFF}\u{2900}-\u{297F}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{2500}-\u{25FF}\u{20D0}-\u{20FF}\u{FE00}-\u{FE0F}]/u; 
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export default function ContentSection({
  points,
}: {
  title: string; 
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isEmpty } = parsePoint(point); 

        const { emoji, text } = parseEmojiPoint(point);

        if (isEmpty && !emoji && !text) {
          return null; 
        }

        return (
          <div
            key={`point-${index}`}
            className="group relative bg-gradient-to-b from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
          
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    
            <div className="relative flex items-start gap-3">
  
              {emoji && <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>}
            
              <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">{text || point}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}