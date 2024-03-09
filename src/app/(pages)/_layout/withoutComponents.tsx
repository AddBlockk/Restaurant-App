import React from "react";

interface WithoutComponentsLayoutProps {
  children: React.ReactNode;
}

const WithoutComponentsLayout: React.FC<WithoutComponentsLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default WithoutComponentsLayout;
