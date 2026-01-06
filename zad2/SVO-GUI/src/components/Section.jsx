const Section = ({ title, children, color }) => (
  <div
    className={`flex flex-col flex-1 p-5 border-2 border-solid ${
      color.split(" ")[0]
    } rounded-xl bg-white shadow-sm min-w-75`}
  >
    <h3 className={`font-bold text-lg mb-4 ${color.split(" ")[1]}`}>{title}</h3>
    <div className="flex-1">{children}</div>
  </div>
);

export default Section;
