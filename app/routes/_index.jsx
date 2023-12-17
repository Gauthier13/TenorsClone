import Navbar from "../components/Navbar";

// Changer le titre de la page
export const meta = () => {
  return [{ title: "Home" }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Navbar />
    </div>
  );
}
