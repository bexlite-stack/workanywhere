interface RangeProps {
  name: string;
  label: string;
  minLabel: string;
  maxLabel: string;
}

export const RangeInput = ({ name, label, minLabel, maxLabel }: RangeProps) => {
  return (
    <section>
      <label class="font-bold px-1">{label}</label>
      <input name={name} type="range" step="0.5" min={0} max={10} value="5" class="focus:ring-0 p-0 appearance-auto accent-black bg-slate-50" />
      <div class="flex justify-between text-sm font-medium px-1 mt-1">
        <label>{minLabel}</label>
        <label>{maxLabel}</label>
      </div>
    </section>
  );
};
