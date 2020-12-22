import React from "react";

interface TextContentProps {
  textValue: string | null | undefined;
}

const TextContent: React.FC<TextContentProps> = ({ textValue }) => {
  return <div>{textValue}</div>;
};

export default TextContent;
