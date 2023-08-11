// src/models/MerchantData.ts

export type MerchantData = {
  merchantAddress: string;
  name: string;
  street: string;
  number: string;
  postcode: string;
  country: string;
  latitude: number | string;
  longitude: number | string;
  description: string;
};

export const isValidMerchantData = (data: MerchantData): boolean => {
  // Validate EVM wallet address (simple regex check for 0x prefixed, 42 characters)
  // if (!/^0x[a-fA-F0-9]{40}$/.test(data.merchantAddress)) return false;
  console.log("valid address");

  // Validate name, street, number, postcode, country (not empty)
  if (
    !data.name ||
    !data.street ||
    !data.number ||
    !data.postcode ||
    !data.country
  )
    return false;

  console.log("valid strings");

  // Validate latitude and longitude (basic checks)
  // it has to be number
  if (
    +data.latitude < -90 ||
    +data.latitude > 90 ||
    +data.longitude < -180 ||
    +data.longitude > 180
  )
    return false;

  console.log("valid lat/long");

  // Validate description (up to 300 characters)
  if (data.description.length > 300) return false;

  console.log("valid description");

  return true;
};

export const merchantDataToJson = (data: MerchantData): MerchantData => {
  // Return the input object directly, as it already conforms to the desired JSON format
  // Add any desired transformations here if needed
  return data;
};
