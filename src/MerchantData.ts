// src/models/MerchantData.ts

export type MerchantData = {
  merchantAddress: string;
  name: string;
  street: string;
  number: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
};

export const isValidMerchantData = (data: MerchantData): boolean => {
  // Validate EVM wallet address (simple regex check for 0x prefixed, 42 characters)
  if (!/^0x[a-fA-F0-9]{40}$/.test(data.merchantAddress)) return false;

  // Validate name, street, number, postcode, country (not empty)
  if (
    !data.name ||
    !data.street ||
    !data.number ||
    !data.postcode ||
    !data.country
  )
    return false;

  // Validate latitude and longitude (basic checks)
  if (
    data.latitude < -90 ||
    data.latitude > 90 ||
    data.longitude < -180 ||
    data.longitude > 180
  )
    return false;

  // Validate description (up to 300 characters)
  if (data.description.length > 300) return false;

  return true;
};
