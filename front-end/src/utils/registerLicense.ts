import { registerLicense } from '@syncfusion/ej2-base';

export function registerSyncfusionLicense(): void {
  const licenseKey = process.env.NEXT_PUBLIC_License_Key;
  if (licenseKey) {
    registerLicense(licenseKey);
    console.log(licenseKey);
  } else {
    console.warn('Syncfusion license key is missing!');
  }
}
