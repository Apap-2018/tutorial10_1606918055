import React from "react";

export class FormCreateLabResult extends React.PureComponent {
  render() {
    const { onSubmit, listPasien } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <h2>Create Lab Result</h2>
        <div className="form-group">
          <label>
            Jenis<span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" className="form-control" name="jenis" required />
        </div>
        <div className="form-group">
          <label>
            Hasil<span style={{ color: "red" }}>*</span>
          </label>
          <textarea className="form-control" name="hasil" rows={10} required />
        </div>
        <div className="form-group">
          <label>
            Tanggal Pengajuan<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            className="form-control"
            name="tanggalPengajuan"
            required
          />
        </div>
        <div className="form-group">
          <label>
            Pasien<span style={{ color: "red" }}>*</span>
          </label>
          <select className="form-control" name="idPasien" required>
            <option value="">Pilih Pasien</option>
            {listPasien.map((pasien, index) => {
              return (
                <option key={index} value={pasien.id}>
                  {pasien.nama}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-success" value="submit">
          Submit
        </button>
      </form>
    );
  }
}
