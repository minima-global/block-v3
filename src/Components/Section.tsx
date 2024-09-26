import { type PropsWithChildren } from "react";

type SectionProps = {
  className?: string;
};

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  className,
  children,
}) => (
  <section className={`${className ? className : ""} lg:0 px-5`}>
    <div className="container mx-auto">{children}</div>
  </section>
);

export default Section;
