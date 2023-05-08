import "./Frames.css";

type DashboardFrameProps = {
  styles?: {
    container?: React.CSSProperties;
    eclipse?: React.CSSProperties;
  };
  icon: React.ReactNode;
};

const DashboardFrame = ({ styles = {}, icon }: DashboardFrameProps) => {
  const { container = {}, eclipse = {} } = styles;

  return (
    <div className="dashboard-frame" style={{ ...container }}>
      {icon}
      <div className="eclipse-10" style={{ ...eclipse }} />
    </div>
  );
};

export default DashboardFrame;
