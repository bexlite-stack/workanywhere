import moment from "moment";
import { Avatar } from "../../components/avatar";

interface ReviewCardProps {
  name: string;
  review: string;
  createdAt: string;
}

export const ReviewCard = ({ review, name, createdAt }: ReviewCardProps) => {
  return (
    <main class="card p-6 space-y-4">
      <p class="whitespace-pre-line font-medium">{review}</p>
      <section class="flex justify-between items-center">
        <div class="flex gap-2 items-center ">
          <Avatar avatarUrl={""} name={name} />
          <h6 class="font-bold">{name}</h6>
        </div>
        <p class="font-medium text-sm">{moment(parseInt(createdAt)).fromNow()}</p>
      </section>
    </main>
  );
};
