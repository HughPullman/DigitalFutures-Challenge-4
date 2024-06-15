import { beforeEach, expect } from "vitest";

import { loginService, registerService, changePassService, addLocation, getLocations, deleteLocations } from "../src/utils/user.service";
import axios from "axios";

vi.mock('axios');

const mockUser = {
   username: "TestUsername",
   password: "TestPassword1!"
};

const mockChangePassUser = {
   username: "TestUsername",
   password: "TestPassword1!",
   newPassword: "TestNewPassword1!"
};

const mockAddLocation = {
   id: "TestId",
   location: "TestLocation"
};

const mockDeleteLocation = {
   id: "TestId",
   location: "TestLocation"
};

const mockId = {
   id: "TestId"
};

describe("User Service tests", () => {
   beforeEach(() => {
      axios.mockReset();
   })

   it("should make a post when calling loginService and return the id", async () => {
      axios.post.mockResolvedValue({
         data: mockId
      });

      const loginRes = await loginService(mockUser);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/login`, mockUser);
      expect(loginRes).toEqual({data: mockId});

   });

   it("should make return an error when the request fails", async () => {
      axios.post.mockResolvedValue(
         new Error("Network Error")
      );

      const loginRes = await loginService(mockUser);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/login`, mockUser);
      expect(loginRes).toEqual(new Error("Network Error"));

   });

    it("should make a post when calling registerService", async () => {
      axios.post.mockResolvedValue({
        status:200
      });

      const registerRes = await registerService(mockUser);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/register`, mockUser);
      expect(registerRes).toEqual({status:200});

   });

   it("should make return an error when the request fails", async () => {
      axios.post.mockResolvedValue(
         new Error("Network Error")
      );

      const registerRes = await registerService(mockUser);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/register`, mockUser);
      expect(registerRes).toEqual(new Error("Network Error"));

   });

    it("should make a post when calling changePassService", async () => {
      axios.post.mockResolvedValue({
        status:200
      });

       const changePassRes = await changePassService(mockChangePassUser);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/passChange`, mockChangePassUser);
      expect(changePassRes).toEqual({status:200});

    });
   
   it("should make return an error when the request fails", async () => {
      axios.post.mockResolvedValue(
         new Error("Network Error")
      );

      const changePassRes = await changePassService(mockChangePassUser);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/passChange`, mockChangePassUser);
      expect(changePassRes).toEqual(new Error("Network Error"));

   });

   it("should make a post when calling addLocation", async () => {
      axios.post.mockResolvedValue({
        status:200
      });

       const changePassRes = await addLocation(mockAddLocation);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/addLocation`, mockAddLocation);
      expect(changePassRes).toEqual({status:200});

   });
   
   it("should make return an error when the request fails", async () => {
      axios.post.mockResolvedValue(
         new Error("Network Error")
      );

      const changePassRes = await addLocation(mockAddLocation);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/addLocation`, mockAddLocation);
      expect(changePassRes).toEqual(new Error("Network Error"));

   });

   it("should make a post when calling getLocation", async () => {
      axios.post.mockResolvedValue({
        status:200
      });

       const changePassRes = await getLocations(mockId);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/getLocations`, mockId);
      expect(changePassRes).toEqual({status:200});

   });

    it("should make return an error when the request fails", async () => {
      axios.post.mockResolvedValue(
         new Error("Network Error")
      );

      const changePassRes = await getLocations(mockId);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/getLocations`, mockId);
      expect(changePassRes).toEqual(new Error("Network Error"));

    });
   
   it("should make a post when calling deleteLocations", async () => {
      axios.post.mockResolvedValue({
        status:200
      });

       const changePassRes = await deleteLocations(mockDeleteLocation);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/deleteLocation`, mockDeleteLocation);
      expect(changePassRes).toEqual({status:200});

   });

   it("should make return an error when the request fails", async () => {
      axios.post.mockResolvedValue(
         new Error("Network Error")
      );

      const changePassRes = await deleteLocations(mockDeleteLocation);

      expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/deleteLocation`, mockDeleteLocation);
      expect(changePassRes).toEqual(new Error("Network Error"));
    });
});