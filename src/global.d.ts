declare global {
  type TallyPopupOptions = {
    key?: string;
    layout?: "default" | "modal";
    width?: number;
    alignLeft?: boolean;
    hideTitle?: boolean;
    overlay?: boolean;
    emoji?: {
      text: string;
      animation:
        | "none"
        | "wave"
        | "tada"
        | "heart-beat"
        | "spin"
        | "flash"
        | "bounce"
        | "rubber-band"
        | "head-shake";
    };
    autoClose?: number;
    showOnce?: boolean;
    doNotShowAfterSubmit?: boolean;
    customFormUrl?: string;
    hiddenFields?: Record<string, unknown>;
  };

  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      target: string | Date,
      params?: Record<string, string | number | boolean | undefined>,
    ) => void;
    Tally?: {
      loadEmbeds?: () => void;
      openPopup?: (
        formId: string,
        options?: TallyPopupOptions & {
          onOpen?: () => void;
          onClose?: () => void;
          onPageView?: (page: number) => void;
          onSubmit?: (payload: { id: string }) => void;
        },
      ) => void;
      closePopup?: (formId: string) => void;
    };
  }
}

export {};
