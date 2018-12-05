import React from "react";
import { DaftarPasienRow } from "../components/DaftarPasienRow";
import { Loading } from "../components/Loading";
import { TableContainer } from "../containers/TableContainer";
import Appointment from "../utils/Appointment";

export class DaftarPasien extends React.Component {
  /**
   * TODO: Akses method getAllPasien() pada Appointment dan lakukan update state.
   * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
   */

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listPasien: []
    };
  }

  componentDidMount() {
    Appointment.getAllPasien()
      .then(({ result }) => {
        this.setState({ listPasien: result });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <Loading msg="Fetching Data..." />;
    } else {
      return (
        <TableContainer
          title="Daftar Pasien"
          header={["Nama Pasien", "Status Pasien", "Aksi"]}
        >
          <DaftarPasienRow listPasien={this.state.listPasien} />
        </TableContainer>
      );
    }
  }
}
