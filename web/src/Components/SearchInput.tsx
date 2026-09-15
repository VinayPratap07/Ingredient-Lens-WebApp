function SearchInput() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("val");
  };
  return (
    <div className="flex items-center justify-center w-full h-10 ">
      <form onSubmit={handleSubmit} className="w-[95%] h-full">
        <input
          type="text"
          className="border-b bg-white border-[#C8D0CA] w-full h-full rounded-2xl p-2 focus:border focus:outline-none"
          placeholder="Search Ingredient"
        />
      </form>
    </div>
  );
}

export default SearchInput;
