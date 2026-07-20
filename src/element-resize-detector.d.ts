declare module "element-resize-detector" {
  interface ElementResizeDetector {
    listenTo(
      element: HTMLElement,
      callback: (element: HTMLElement) => void,
    ): void;
    removeListener(
      element: HTMLElement,
      callback: (element: HTMLElement) => void,
    ): void;
    removeAllListeners(element: HTMLElement): void;
    uninstall(element: HTMLElement): void;
  }

  interface ElementResizeDetectorOptions {
    strategy?: "scroll" | "object";
    callOnAdd?: boolean;
  }

  function elementResizeDetectorMaker(
    options?: ElementResizeDetectorOptions,
  ): ElementResizeDetector;

  export default elementResizeDetectorMaker;
}
