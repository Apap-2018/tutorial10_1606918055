import { fetch } from "whatwg-fetch";

const cors = "https://cors-anywhere.herokuapp.com";
const apiUrl = "http://si-appointment.herokuapp.com/api";

const baseUrl = `${cors}/${apiUrl}`;

async function checkStatusAndTransform(promise) {
  return promise.then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      const error = new Error(response.statusText);
      error.response = response.json();
      throw error;
    }
  });
}

export default {
  async getAllPasien() {
    /**
     * TODO: Fetch data all pasien
     * @return listAllPasien
     */
    return await checkStatusAndTransform(
      fetch(`${baseUrl}/1/getAllPasien`, { method: "GET" })
    );
  },
  async getDetailPasien(idPasien) {
    /**
     * TODO: Fetch detail data pasien
     * @param idPasien
     * @return detailPasien
     */
    return await checkStatusAndTransform(
      fetch(`${baseUrl}/getPasien/${idPasien}`, {
        method: "GET"
      })
    );
  },
  async updateStatusPasien(requestBody) {
    /**
     * TODO: POST data baru pasien ke SI-Appointment
     * @param requestBody
     * @return responseRequest
     */
    return await checkStatusAndTransform(
      fetch(`${baseUrl}/1/updatePasien`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
    );
  },
  async getAllStaffFarmasi() {
    return await checkStatusAndTransform(
      fetch(`${baseUrl}/1/getAllStaffFarmasi`)
    );
  },
  async addLabResult(jenis, hasil, tanggalPengajuan, idPasien) {
    return await checkStatusAndTransform(
      fetch(`${baseUrl}/1/addLabResult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jenis,
          hasil,
          tanggalPengajuan,
          pasien: {
            id: idPasien
          }
        })
      })
    );
  }
};
