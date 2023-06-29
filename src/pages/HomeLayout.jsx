import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  // passing global values to Outlet via RRD
  const value = "Ever forward";
  return (
    <>
      <section className="page">
        <Outlet context={{ value }} />
      </section>
    </>
  );
};
export default HomeLayout;
