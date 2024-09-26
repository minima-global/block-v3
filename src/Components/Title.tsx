type TitleProps = {
  title: string
  gradient?: boolean
}

const Title: React.FC<TitleProps> = ({ title, gradient = false }) => (
  <section className="px-5 pb-8 pt-11 text-black lg:pb-14 lg:pt-20 dark:text-white">
    <div className="container mx-auto">
      <div className="grid-cols-1 mb-4 grid">
        <div className="col-span-1">
          <h4 className="text-2xl font-semibold tracking-wide lg:mb-4 lg:text-[40px] lg:font-normal">
            {title}
          </h4>
        </div>
      </div>
      {gradient && (
        <div className="bg-custom-gradient animate-gradient block h-[4px] w-full" />
      )}
    </div>
  </section>
)

export default Title
