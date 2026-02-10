interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) => {
  return (
    <div className={`text-center space-y-4 mb-16 ${className}`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
        {title}
      </h2>
      <p className="text-xl text-default-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};
