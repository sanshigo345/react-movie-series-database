import { Title } from "@components/base";

const BaseHeader: React.FC = () => {
  return (
    <header className="flex flex-col items-center my-3">
      <Title level={4} variant="tertiary" className="text-black">
        Movies Series Database
      </Title>
    </header>
  );
};

export default BaseHeader;
