const Viewer = ({ fileUrl }) => {
  return (
    <iframe
      src={fileUrl}
      width="100%"
      height="600%"
      style={{ border: 'none' }}
      title="PDF Viewer"
    />
  );
};

export default Viewer;