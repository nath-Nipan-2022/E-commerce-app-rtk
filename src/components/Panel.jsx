const Panel = ({ title, children, className }) => {
  return (
    <article className={`${className}`}>
      {title && <h3 className="mb-2 font-medium">{title}</h3>}
      {children}
    </article>
  );
};
export default Panel;
