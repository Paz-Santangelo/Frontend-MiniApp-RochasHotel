import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /* AUTH */
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response;
  }

  static async loginUser(loginDetails) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    //console.log(response);
    return response;
  }

  /* USUARIOS */
  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserProfile() {
    const response = await axios.get(`${this.BASE_URL}/users/logged`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /* This is the  to get a single user */
  static async getUser(userId) {
    const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /* This is the  to get user bookings by the user id */
  static async getUserBookings(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/bookings/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is to delete a user */
  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    //console.log(!!token);

    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  /* HABITACIONES */
  static async addRoom(formData) {
    const result = await axios.post(`${this.BASE_URL}/rooms/create`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  }

  static async getAllRooms() {
    const result = await axios.get(`${this.BASE_URL}/rooms/all`);
    //console.log(result);
    return result;
  }
  
  static async getRoomTypes() {
    const response = await axios.get(`${this.BASE_URL}/rooms/types`);
    return response.data;
  }

  static async getRoomById(roomId) {
    const result = await axios.get(`${this.BASE_URL}/rooms/${roomId}`);
    //console.log(result.data);

    return result.data;
  }

  static async getAllAvailableRooms() {
    const result = await axios.get(`${this.BASE_URL}/rooms/all/availables`);
    return result.data;
  }

  static async getAvailableRoomsByDateAndType(
    checkInDate,
    checkOutDate,
    roomType
  ) {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/availables/datetypes?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    /* console.log(result.data);
    console.log(result.status); */

    return result;
  }

  static async deleteRoom(roomId) {
    const result = await axios.delete(
      `${this.BASE_URL}/rooms/delete/${roomId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result;
  }

  static async updateRoom(roomId, formData) {
    const result = await axios.put(
      `${this.BASE_URL}/rooms/update/${roomId}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  }

  /* BOOKING */
  static async bookRoom(roomId, userId, booking) {
    //console.log("USER ID IS: " + userId);

    const response = await axios.post(
      `${this.BASE_URL}/bookings/create/${roomId}/${userId}`,
      booking,
      {
        headers: this.getHeader(),
      }
    );
    return response;
  }

  /* This  gets alll bokings from the database */
  static async getAllBookings() {
    const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
      headers: this.getHeader(),
    });
    return result.data;
  }

  /* This  get booking by the cnfirmation code */
  static async getBookingByConfirmationCode(bookingCode) {
    const result = await axios.get(
      `${this.BASE_URL}/bookings/confirmation/${bookingCode}`
    );
    return result.data;
  }

  /* This is the  to cancel user booking */
  static async cancelBooking(bookingId) {
    const result = await axios.delete(
      `${this.BASE_URL}/bookings/cancel/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }
}
