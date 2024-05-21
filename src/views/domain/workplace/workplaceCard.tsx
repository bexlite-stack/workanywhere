import { IWorkplace } from "../../../types/entity";
import { ProgressBar } from "../../components/progressBar";

interface WorkplaceCardProps {
  workplace: IWorkplace;
}

export const WorkplaceCard = ({ workplace }: WorkplaceCardProps) => {
  const images = JSON.parse(workplace.images as string);

  return (
    <a href={`/workplaces/${workplace.slug}`}>
      <div class="group relative cursor-pointer hover:shadow-2xl rounded-xl overflow-hidden transition duration-150">
        <img src={`/public/images/workplaces/${workplace.id}/${images[0]}`} class="w-full h-[320px] object-cover object-center " />
        <div class="bg-gradient-to-t from-black to-transparent text-white p-6 absolute bottom-0 left-0 w-full ">
          <h2>{workplace.name}</h2>
          <h4>{workplace.city}</h4>
        </div>
        <div class="group-hover:opacity-100 opacity-0 absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-lg flex flex-col justify-between text-white p-12 transition duration-300 ease-in-out">
          <ProgressBar progress={workplace.electricity as number} label="Electricity" minLabel="" maxLabel="" />
          <ProgressBar progress={workplace.comfortness as number} label="Comfortness" minLabel="" maxLabel="" />
          <ProgressBar progress={workplace.toilet as number} label="Toilet" minLabel="" maxLabel="" />
          <ProgressBar progress={workplace.internet as number} label="Internet" minLabel="" maxLabel="" />
          <ProgressBar progress={workplace.foodPrice as number} label="Food Price" minLabel="" maxLabel="" />
          <ProgressBar progress={workplace.foodQuality as number} label="Food Quality" minLabel="" maxLabel="" />
        </div>
      </div>
    </a>
  );
};
