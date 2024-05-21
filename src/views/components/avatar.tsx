import uniqolor from "uniqolor";

export const Avatar = ({ avatarUrl, name }: { avatarUrl?: string; name: string }) => {
  if (avatarUrl) {
    return <img src={avatarUrl as string} class="w-8 h-8 rounded-full" />;
  }

  const firstLetterOfName = name?.charAt(0).toUpperCase();
  return (
    <div style={{ backgroundColor: uniqolor(name).color }} class=" text-white font-medium w-6 h-6 rounded-full text-xs flex justify-center items-center">
      {firstLetterOfName}
    </div>
  );
};
