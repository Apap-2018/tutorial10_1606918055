import React from "react";
import { Loading } from "../components/Loading";
import { FormUpdatePasien } from "../containers/FormUpdatePasien";
import Appointment from "../utils/Appointment";

export class UpdatePasien extends React.Component {
  /**
   * TODO: Akses method getDetailPasien(idPasien) pada Appointment dan lakukan update state.
   * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
   */

  state = {
    loading: true,
    pasien: {}
  };

  componentDidMount() {
    const {
      match: { params },
      history
    } = this.props;
    if (params.id) {
      Appointment.getDetailPasien(params.id)
        .then(({ result }) => {
          this.setState({
            loading: false,
            pasien: result
          });
        })
        .catch(() => {
          alert("Data tidak ditemukan.");
          history.push("/all-pasien");
        });
    }
  }

  handleFormSubmit = e => {
    /**
     * TODO: Akses method updateStatusPasien(requestBody) pada Appointment dan lakukan update state.
     */
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {};

    this.setState({ loading: true }, () => {
      data.forEach((value, key) => {
        if (value) {
          const name = key.split(".");
          if (name.length > 1) {
            let last = name.pop();
            name.reduce((prev, next) => {
              return (prev[next] = prev[next] || {});
            }, payload)[last] = value;
          } else {
            payload[key] = value;
          }
        }
      });

      const { pasien } = this.state;
      Appointment.updateStatusPasien(payload)
        .then(({ result }) => {
          if (result) {
            this.setState({ pasien: result }, () => {
              alert(`Sukses update pasien ${result.nama}`);
            });
          }
        })
        .catch(() => {
          alert(`Gagal update pasien ${pasien.nama}`);
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
        <FormUpdatePasien
          pasien={this.state.pasien}
          onSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}
