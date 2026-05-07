import Image from "next/image";

export const HeroImage = () => {
  return (
    <div className="relative">
      <Image
        src="/hero-doctor.png"
        alt="Professional healthcare team"
        width={800}
        height={600}
        className="w-full h-auto rounded-2xl"
        priority
      />
    </div>
  );
};
