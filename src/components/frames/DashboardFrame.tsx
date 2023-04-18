import "./Frames.css";

type DashboardFrameProps = {
  styles?: {
    container?: React.CSSProperties;
    eclipse?: React.CSSProperties;
  };
  icon: string;
};

const DashboardFrame = ({ styles = {}, icon }: DashboardFrameProps) => {
  const { container = {}, eclipse = {} } = styles;

  return (
    <div className="dashboard-frame" style={{ ...container }}>
      <img src={icon} alt="" className="dashboard-icon" />
      <div className="eclipse-10" style={{ ...eclipse }} />
    </div>
  );
};

export default DashboardFrame;
