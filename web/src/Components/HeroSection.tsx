function HeroSection() {
  return (
    // <div className="grid grid-cols-2 grid-rows-1 bg-gradient-to-br from-[#23483A] via-[#315C4A] to-[#456B57] text-[#F7F3EA] h-70">
    //   <div className="flex flex-col items-end justify-center p-5 text-black">
    //     <label className="text-xl font-extrabold">This is Hero </label>
    //     <label className="text-xl font-extrabold"> Section </label>
    //   </div>
    //   <div className="flex flex-col items-center justify-center p-5 text-black">
    //     <label className="">Hello</label>
    //   </div>
    <div>
      <section className="bg-gradient-to-br from-[#23483A] via-[#315C4A] to-[#456B57] text-[#F7F3EA] px-6 py-16 text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-[#C5B98A] mb-4">
          Ingredient Intelligence
        </p>

        <h1 className="text-4xl font-bold leading-tight">
          Know what's
          <br />
          inside your skincare.
        </h1>

        <p className="mt-5 text-[#DDE5DF] text-sm leading-relaxed max-w-md mx-auto">
          Scan your product and understand what's really inside it. Get simple
          information about ingredients, their purpose, benefits, and potential
          concerns.
        </p>
      </section>
    </div>
  );
}

export default HeroSection;
