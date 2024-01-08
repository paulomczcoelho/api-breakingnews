import { Navbar } from "../../componentes/Navbar/Navbar";

export default function Home() {
  return (
    <section>
      {" "}
      {/* Fragment */}
      <Navbar />
      <h1 className="welcomeColor">Hello Home.jsx</h1>
    </section>
  );
}
