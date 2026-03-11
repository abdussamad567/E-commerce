import "./HeroBg.css";

const HeroBg = ({ imageUrl = "/backffss.png", children }) => {
  return (
    <div
      className="hero-bg"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        {children}
      </div>
    </div>
  );
};

export default HeroBg;
