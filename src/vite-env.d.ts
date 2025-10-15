/// <reference types="vite/client" />

// IntaSend type declarations
interface IntaSendConfig {
  publicAPIKey: string;
  live: boolean;
}

interface IntaSendCheckout {
  on(event: 'COMPLETE' | 'FAILED' | 'IN-PROGRESS', callback: (response?: any) => void): IntaSendCheckout;
  collect(data: {
    amount: number;
    currency: string;
    api_ref: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }): void;
}

interface IntaSendConstructor {
  new (config: IntaSendConfig): IntaSendCheckout;
}

interface Window {
  IntaSend: IntaSendConstructor;
}
