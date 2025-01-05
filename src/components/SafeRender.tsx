const htmlContent = "<p>Content</p>";

const SafeRender = () => {
  return (
    <div
      innerHTML={{ __html: htmlContent }}
    />
  );
};

export default SafeRender;