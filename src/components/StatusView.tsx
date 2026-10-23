import React from "react";

interface StatusViewProps {
  status: "loading" | "error";
  errorMsg?: string;
  onRetry: () => void;
}

export const StatusView: React.FC<StatusViewProps> = ({
  status,
  errorMsg,
  onRetry,
}) => {
  if (status === "loading") {
    return <div className="status-box">Đang tải dữ liệu</div>;
  }
  if (status === "error") {
    return (
      <div className="status-box error">
        <p>{errorMsg || "Đã có lỗi xảy ra."}</p>
        <button onClick={onRetry}>Thử lại</button>
      </div>
    );
  }
  return null;
};
