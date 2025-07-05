import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Our advanced AI processes your document instantly",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Receive a clear, concise summary of your document",
  },
];

export default function HowitWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%-3rem)] aspect-1155/900 w-144.5 -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(40%-30rem)] sm:w-160.75"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-stretch">
              <StepItem {...step} />
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-rose-500/30 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full items-center text-center">
        <div className="h-24 w-24 flex items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>
        <h4 className="font-bold text-xl">{label}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
