import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import FloatingShapes from "@/components/ui/FloatingShapes";

export const metadata = {
  title: "HR-Pulse | Analyse d'Offres d'Emploi IA",
  description: "Plateforme intelligente d'analyse d'offres d'emploi et de prédiction salariale par IA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased overflow-x-hidden">
        <NoiseOverlay />
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
