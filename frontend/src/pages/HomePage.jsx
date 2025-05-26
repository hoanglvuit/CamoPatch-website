import { useNavigate } from "react-router-dom";
import attackVisualization from '../img/attack_visualization.png';

export default function HomePage() {
  const navigate = useNavigate();

  const handleTryClick = () => {
    navigate("/try");
  };

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "3rem auto",
        padding: "0 1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2c3e50",
        lineHeight: 1.7,
      }}
    >
      <section>
        <p style={{ fontSize: "1.15rem", marginBottom: "1rem" }}>
          Adversarial patches are physical objects or digital overlays that can cause deep learning models, particularly image classifiers, to misclassify inputs. Unlike traditional pixel-wise adversarial attacks, patches are localized and can be applied to physical objects in the real world.
        </p>
        <p style={{ fontSize: "1.15rem", marginTop: "1rem", color: "#555" }}>
          Inspired by the innovative techniques presented in the <em style={{ fontStyle: "italic", color: "#34495e" }}>CamoPatch</em> paper, this project aims to generate adversarial patches that are not only effective at fooling a traffic sign classifier but are also designed to be more perceptually transparent, blending better with the background context they replace.
        </p>
      </section>

      <section style={{ marginTop: "3rem", textAlign: "center" }}>
        <h2 style={{ color: "#1e40af", fontWeight: "700", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          This is a web demo for the attack project on{" "}
          <a
            href="https://github.com/hoanglvuit/Blackbox-Attack-on-Realworld"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              borderBottom: "2px solid #3b82f6",
              transition: "color 0.3s, border-bottom-color 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#1e40af";
              e.currentTarget.style.borderBottomColor = "#1e40af";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#3b82f6";
              e.currentTarget.style.borderBottomColor = "#3b82f6";
            }}
          >
            GitHub
          </a>
        </h2>

        <img
          src={attackVisualization}
          alt="Attack Visualization"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            marginTop: "1rem",
          }}
        />

        <h2 style={{ marginTop: "2rem", color: "#065f46", fontWeight: "700", fontSize: "1.5rem" }}>
          Now, let's go try the algorithm
        </h2>

        <button
          onClick={handleTryClick}
          style={{
            marginTop: "1.5rem",
            cursor: "pointer",
            padding: "0.85rem 2rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: 8,
            border: "2px solid #059669",
            backgroundColor: "white",
            color: "#059669",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#059669";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(5, 150, 105, 0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#059669";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
          }}
          aria-label="Go to Try Page"
        >
          Go to Try
        </button>
      </section>
    </main>
  );
}
