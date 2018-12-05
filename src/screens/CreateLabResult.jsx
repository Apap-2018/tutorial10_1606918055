import React from "react";
import { Loading } from "../components/Loading";
import { FormCreateLabResult } from "../containers/FormCreateLabResult";
import Appointment from "../utils/Appointment";

export class CreateLabResult extends React.Component {
  /**
   * TODO: Akses method getDetailPasien(idPasien) pada Appointment dan lakukan update state.
   * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
   */

  state = {
    loading: true,
    listPasien: []
  };

  componentDidMount() {
    Appointment.getAllPasien()
      .then(({ result }) => this.setState({ listPasien: result }))
      .catch(() => alert("Gagal melakukan load pasien"))
      .finally(() => this.setState({ loading: false }));
  }

  handleFormSubmit = e => {
    /**
     * TODO: Akses method updateStatusPasien(requestBody) pada Appointment dan lakukan update state.
     */
    e.preventDefault();
    const data = new FormData(e.target);
    this.setState({ loading: true }, () => {
      Appointment.addLabResult(
        data.get("jenis"),
        data.get("hasil"),
        data.get("tanggalPengajuan"),
        data.get("idPasien")
      )
        .then(({ result }) => {
          if (result) {
            this.setState({ pasien: result }, () => {
              alert(`Sukses membuat lab result`);
            });
          }
        })
        .catch(e => {
          alert(`Gagal membuat lab result: ${e.message}`);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading msg="Fetching Data..." />;
    } else {
      return (
        <FormCreateLabResult
          listPasien={this.state.listPasien}
          onSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}
