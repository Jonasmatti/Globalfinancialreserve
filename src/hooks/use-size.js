import * as React from 'react';

export function useSize(ref) {
  const [size, setSize] = React.useState(null);

  React.useLayoutEffect(() => {
    const element = ref?.current;
    if (!element) return undefined;

    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
