import React from "react";
import { StaffFarmasiRow } from "../components/StaffFarmasiRow";
import { Loading } from "../components/Loading";
import { TableContainer } from "../containers/TableContainer";
import Appointment from "../utils/Appointment";

export class DaftarStaffFarmasi extends React.Component {
  /**
   * TODO: Akses method getAllPasien() pada Appointment dan lakukan update state.
   * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
   */

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listStaffFarmasi: []
    };
  }

  componentDidMount() {
    Appointment.getAllStaffFarmasi()
      .then(({ result }) => {
        this.setState({ listStaffFarmasi: result });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <Loading msg="Fetching Data..." />;
    } else {
      return (
        <TableContainer title="Daftar Staff Farmasi" header={["Nama Staff"]}>
          <StaffFarmasiRow listStaffFarmasi={this.state.listStaffFarmasi} />
        </TableContainer>
      );
    }
  }
}
