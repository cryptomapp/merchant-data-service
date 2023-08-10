import request from "supertest";
import express from "express";
import uploadController from "../src/uploadController";

// Mock the bundlrService's behavior
jest.mock("../src/bundlrService", () => ({
  createBundlrInstance: jest.fn().mockReturnValue({
    upload: jest.fn().mockResolvedValue({ id: "mocked_id" }),
  }),
}));

const app = express();
app.use(express.json());
app.use("/upload", uploadController);

describe("Upload Controller", () => {
  it("should return link when valid data is provided", async () => {
    const response = await request(app).post("/upload").send({
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: -74.006,
      description: "A short description.",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ link: "https://arweave.net/mocked_id" });
  });

  it("should return an error for an invalid merchant address", async () => {
    const response = await request(app).post("/upload").send({
      merchantAddress: "0xINVALID", // Invalid address
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: -74.006,
      description: "A short description.",
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid merchant data.");
  });

  it("should return an error for missing required fields", async () => {
    const response = await request(app).post("/upload").send({
      merchantAddress: "0x1234567890123456789012345678901234567890",
      // ... missing other fields
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid merchant data.");
  });

  it("should return an error when bundlr service upload fails", async () => {
    const mockError = new Error("Mock upload error");
    jest
      .requireMock("../src/bundlrService")
      .createBundlrInstance.mockReturnValueOnce({
        upload: jest.fn().mockRejectedValue(mockError),
      });

    const response = await request(app).post("/upload").send({
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: -74.006,
      description: "A short description.",
    });

    expect(response.status).toBe(500);
    expect(response.text).toBe(`Upload error: ${mockError.message}`);
  });

  it("should return an error for invalid latitude", async () => {
    const response = await request(app).post("/upload").send({
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 200, // Invalid latitude
      longitude: -74.006,
      description: "A short description.",
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid merchant data.");
  });

  it("should return an error for invalid longitude", async () => {
    const response = await request(app).post("/upload").send({
      merchantAddress: "0x1234567890123456789012345678901234567890",
      name: "Test Merchant",
      street: "Main St.",
      number: "10A",
      postcode: "12345",
      country: "Testland",
      latitude: 40.7128,
      longitude: 200, // Invalid longitude
      description: "A short description.",
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid merchant data.");
  });
});
