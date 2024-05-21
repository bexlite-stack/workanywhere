interface ProgressBarProps {
  progress: number;
  label: string;
  minLabel: string;
  maxLabel: string;
}

export const ProgressBar = ({ progress, label, minLabel, maxLabel }: ProgressBarProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 7.5) {
      return "bg-emerald-400";
    } else if (progress >= 3) {
      return "bg-yellow-400";
    } else {
      return "bg-rose-100";
    }
  };

  const progressColor = getProgressColor(progress);

  return (
    <main class="space-y-1">
      <h3 class="font-semibold text-base">{label}</h3>
      <div class="h-2 w-full bg-stone-200 rounded-full">
        <div class={`${progressColor}  h-full rounded-full`} style={{ width: `${progress * 10}%` }}></div>
      </div>
      <div class="flex justify-between items-center text-sm font-medium text-slate-400">
        <div>{minLabel}</div>
        <div>{maxLabel}</div>
      </div>
    </main>
  );
};
