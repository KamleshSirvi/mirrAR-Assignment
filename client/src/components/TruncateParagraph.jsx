const TruncateParagraph = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  return <p className="truncate overflow-hidden">{truncatedText}</p>;
};

export default TruncateParagraph;
