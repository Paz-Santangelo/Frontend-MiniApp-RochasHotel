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
    return result.data;
  }
  static async getRoomTypes() {
    const response = await axios.get(`${this.BASE_URL}/rooms/types`);
    return response.data;
  }

  static async getRoomById(roomId) {
    const result = await axios.get(`${this.BASE_URL}/rooms/${roomId}`);
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
}
