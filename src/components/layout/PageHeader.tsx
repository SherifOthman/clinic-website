interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
      {subtitle && (
        <p className="text-xl text-default-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};
