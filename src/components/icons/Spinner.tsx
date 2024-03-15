import spinner from "./../../assets/spiner/spinner.svg";

const Spinner = () => {
  return (
    <>
      <img src={spinner} className="animate-spin" alt="Loading..." />
    </>
  );
};

export default Spinner;
