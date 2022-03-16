const SandBox = () => {
  return (
    <>
      <iframe
        src="https://codesandbox.io/embed/headless-stepper-tailwind-9qz9f2?fontsize=14&hidenavigation=1&theme=light&view=preview"
        style={{
          width: '100%',
          height: '500px',
          border: 0,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="headless-stepper-tailwind"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
};

export default SandBox;
