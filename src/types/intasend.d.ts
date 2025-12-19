interface IntaSendOptions {
  publicAPIKey: string;
  live: boolean;
}

interface IntaSendCheckoutOptions {
  amount: number;
  currency: string;
  api_ref: string;
}

interface IntaSendInstance {
  on: (event: string, callback: (response: any) => void) => IntaSendInstance;
  checkout: (options: IntaSendCheckoutOptions) => void;
}

interface IntaSendConstructor {
  new (options: IntaSendOptions): IntaSendInstance;
}

declare global {
  interface Window {
    IntaSend?: IntaSendConstructor;
  }
}

export {};
