interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{title}</h1>
      {subtitle && (
        <p className="text-default-600 mx-auto max-w-2xl text-xl">{subtitle}</p>
      )}
    </div>
  );
};
