import { MerchantData, isValidMerchantData } from "../src/MerchantData";

describe("MerchantData validation", () => {
  it("should validate correct merchant data", () => {
    const data: MerchantData = {
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: -74.006,
      description: "A short description.",
    };
    expect(isValidMerchantData(data)).toBe(true);
  });

  it("should invalidate incorrect EVM address", () => {
    const data: MerchantData = {
      merchantAddress: "INVALID", // invalid EVM address
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: -74.006,
      description: "A short description.",
    };
    expect(isValidMerchantData(data)).toBe(false);
  });

  it("should invalidate missing name", () => {
    const data: MerchantData = {
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "", // empty name
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: -74.006,
      description: "A short description.",
    };
    expect(isValidMerchantData(data)).toBe(false);
  });

  it("should invalidate out-of-bounds latitude", () => {
    const data: MerchantData = {
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 95, // 95 degrees
      longitude: -74.006,
      description: "A short description.",
    };
    expect(isValidMerchantData(data)).toBe(false);
  });

  it("should invalidate too long description", () => {
    const data: MerchantData = {
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 95,
      longitude: -74.006,
      description: "A".repeat(301), // 301 characters
    };
    expect(isValidMerchantData(data)).toBe(false);
  });

  it("should invalidate all fields empty", () => {
    const data: MerchantData = {
      merchantAddress: "",
      name: "",
      street: "",
      number: "",
      postcode: "",
      country: "",
      latitude: 0,
      longitude: 0,
      description: "",
    };
    expect(isValidMerchantData(data)).toBe(false);
  });
});
