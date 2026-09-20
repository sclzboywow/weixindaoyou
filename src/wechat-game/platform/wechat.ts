export type WxRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface WxRequestResult<T = unknown> {
  data: T;
  statusCode: number;
  header: Record<string, string>;
  cookies?: string[];
}

export interface WxRequestOptions<T = unknown> {
  url: string;
  method?: WxRequestMethod;
  data?: unknown;
  header?: Record<string, string>;
  timeout?: number;
  enableChunked?: boolean;
  responseType?: 'text' | 'arraybuffer';
  success?: (result: WxRequestResult<T>) => void;
  fail?: (error: { errMsg?: string }) => void;
}

export interface WxRequestTask {
  onChunkReceived?(callback: (result: { data: ArrayBuffer }) => void): void;
  offChunkReceived?(callback?: (result: { data: ArrayBuffer }) => void): void;
  abort?(): void;
}

export interface WxSocketTask {
  send(options: {
    data: string | ArrayBuffer;
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
  }): void;
  close(options?: { code?: number; reason?: string }): void;
  onOpen(callback: () => void): void;
  onMessage(callback: (event: { data: string | ArrayBuffer }) => void): void;
  onError(callback: (error: { errMsg?: string }) => void): void;
  onClose(callback: (event: { code?: number; reason?: string }) => void): void;
}

export interface WxCanvas {
  width: number;
  height: number;
  getContext(type: '2d'): CanvasRenderingContext2D;
  requestAnimationFrame?(callback: (timestamp: number) => void): number;
  cancelAnimationFrame?(handle: number): void;
}

export interface WxImage {
  src: string;
  onload: (() => void) | null;
  onerror: ((error: { errMsg?: string }) => void) | null;
}

export interface WxTouch {
  clientX: number;
  clientY: number;
  pageX?: number;
  pageY?: number;
  x?: number;
  y?: number;
}

export interface WxTouchEvent {
  touches: WxTouch[];
  changedTouches: WxTouch[];
}

export interface WxWindowInfo {
  windowWidth: number;
  windowHeight: number;
  pixelRatio: number;
  screenWidth?: number;
  screenHeight?: number;
  safeArea?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  };
}

export interface WxSharePayload {
  title?: string;
  imageUrl?: string;
  imagePreviewUrl?: string;
  query?: string;
}

export interface WxUserInfoButton {
  onTap(
    callback: (result: {
      errMsg?: string;
      userInfo?: Record<string, unknown>;
    }) => void,
  ): void;
  show(): void;
  hide(): void;
  destroy(): void;
}

export interface WxGameClubButtonStyle {
  left: number;
  top: number;
  width: number;
  height: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export interface WxGameClubButton {
  style: WxGameClubButtonStyle;
  show(): void;
  hide(): void;
  destroy(): void;
  onTap?(callback: (result: { errMsg?: string }) => void): void;
  offTap?(callback?: (result: { errMsg?: string }) => void): void;
}

export interface WechatGameApi {
  createCanvas(): WxCanvas;
  loadFont?: (path: string) => string | null;
  createImage?: () => WxImage;
  createUserInfoButton?: (options: {
    type: 'text';
    text: string;
    lang?: 'en' | 'zh_CN' | 'zh_TW';
    withCredentials?: boolean;
    style: {
      left: number;
      top: number;
      width: number;
      height: number;
      backgroundColor: string;
      color: string;
      textAlign: 'left' | 'center' | 'right';
      fontSize: number;
      lineHeight?: number;
      borderColor?: string;
      borderWidth?: number;
      borderRadius: number;
    };
  }) => WxUserInfoButton;
  createGameClubButton?: (options: {
    type: 'text' | 'image';
    text?: string;
    image?: string;
    icon?: 'green' | 'white' | 'dark' | 'light';
    openlink?: string;
    hasRedDot?: boolean;
    style: WxGameClubButtonStyle;
  }) => WxGameClubButton | undefined;
  createPageManager?: () => {
    load(options: { openlink: string }): Promise<unknown>;
    show(): void;
  };
  getWindowInfo(): WxWindowInfo;
  getDeviceInfo?: () => { platform?: string };
  getSystemInfoSync?: () => { platform?: string };
  getLaunchOptionsSync?: () => { query?: Record<string, string> };
  onShow?: (
    callback: (options: { query?: Record<string, string> }) => void,
  ) => void;
  onHide?: (callback: () => void) => void;
  setDeviceOrientation?(options: {
    value: 'portrait' | 'landscape';
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
    complete?: () => void;
  }): void;
  onDeviceOrientationChange?(
    callback: (result: {
      value: 'portrait' | 'landscape' | 'landscapeReverse';
    }) => void,
  ): void;
  getMenuButtonBoundingClientRect?: () => {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  };
  request<T = unknown>(options: WxRequestOptions<T>): WxRequestTask;
  connectSocket(options: {
    url: string;
    header?: Record<string, string>;
    protocols?: string[];
    timeout?: number;
  }): WxSocketTask;
  loadSubpackage?(options: {
    name: string;
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
  }): {
    onProgressUpdate?(
      callback: (result: {
        progress: number;
        totalBytesWritten: number;
        totalBytesExpectedToWrite: number;
      }) => void,
    ): void;
  };
  getStorageSync(key: string): unknown;
  setStorageSync(key: string, value: unknown): void;
  removeStorageSync(key: string): void;
  showKeyboard(options: {
    defaultValue?: string;
    maxLength?: number;
    multiple?: boolean;
    confirmHold?: boolean;
    confirmType?: 'done' | 'next' | 'search' | 'go' | 'send';
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
  }): void;
  hideKeyboard(options?: {
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
  }): void;
  onKeyboardInput(callback: (result: { value: string }) => void): void;
  offKeyboardInput(callback: (result: { value: string }) => void): void;
  onKeyboardConfirm(callback: (result: { value: string }) => void): void;
  offKeyboardConfirm(callback: (result: { value: string }) => void): void;
  onKeyboardComplete(callback: (result: { value: string }) => void): void;
  offKeyboardComplete(callback: (result: { value: string }) => void): void;
  showToast(options: {
    title: string;
    icon?: 'success' | 'error' | 'loading' | 'none';
    duration?: number;
  }): void;
  vibrateShort?(options?: {
    type?: 'heavy' | 'medium' | 'light';
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
  }): void;
  showModal(options: {
    title: string;
    content: string;
    confirmText?: string;
    cancelText?: string;
    success?: (result: { confirm: boolean; cancel: boolean }) => void;
  }): void;
  onNeedPrivacyAuthorization?(
    listener: (
      resolve: (result: {
        event: 'exposureAuthorization' | 'agree' | 'disagree';
      }) => void,
      eventInfo: { referrer: string },
    ) => void,
  ): void;
  setClipboardData?(options: {
    data: string;
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
  }): void;
  showShareMenu?(options: {
    withShareTicket?: boolean;
    menus?: Array<'shareAppMessage' | 'shareTimeline'>;
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
    complete?: () => void;
  }): void;
  onShareAppMessage?(listener: () => WxSharePayload): void;
  onShareTimeline?(listener: () => WxSharePayload): void;
  shareAppMessage?(options: {
    title?: string;
    imageUrl?: string;
    query?: string;
    success?: () => void;
    fail?: (error: { errMsg?: string }) => void;
    complete?: () => void;
  }): void;
  requestSubscribeMessage?(options: {
    tmplIds: string[];
    success?: (result: Record<string, string | number>) => void;
    fail?: (error: { errMsg?: string; errCode?: number }) => void;
    complete?: () => void;
  }): void;
  login(options: {
    timeout?: number;
    success?: (result: { code: string; errMsg?: string }) => void;
    fail?: (error: { errMsg?: string }) => void;
  }): void;
  onTouchStart(callback: (event: WxTouchEvent) => void): void;
  offTouchStart?: (callback?: (event: WxTouchEvent) => void) => void;
  onTouchMove?: (callback: (event: WxTouchEvent) => void) => void;
  onTouchEnd?: (callback: (event: WxTouchEvent) => void) => void;
  onTouchCancel?: (callback: (event: WxTouchEvent) => void) => void;
  onNetworkStatusChange(
    callback: (result: { isConnected: boolean; networkType: string }) => void,
  ): void;
}

declare const wx: WechatGameApi;

export function getWx(): WechatGameApi {
  return wx;
}
