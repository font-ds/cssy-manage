import { Spin } from "antd";
export const FullPageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const FullPageLoading = () => {
  return (
    <div style={FullPageStyle}>
      <Spin size={"large"} />
    </div>
  );
};
