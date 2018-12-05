import React from "react";

export class FormCreateLabResult extends React.PureComponent {
  render() {
    const { onSubmit, idPasien } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <h2>Create Lab Result</h2>
        <input name="idPasien" type="hidden" value={idPasien} />
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
        <button className="btn btn-success" value="submit">
          Submit
        </button>
      </form>
    );
  }
}
