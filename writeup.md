# Write Up

## Jawaban Pertanyaan

1. Untuk masalah security, browser membatasi script dalam melakukan XMLHtttpRequest cors-origin dan hanya bisa melakukan http request pada origin yang sama. Oleh karenanya kita menambahkan CORS.

2. Baris kode tersebut melakukan normalisasi, pada form update pasien misal ada select seperti ini yang memiliki name

   ```jsx
   <select
     className="form-control"
     name="poliRujukan.id"
     defaultValue={!props.pasien.poliRujukan ? "" : props.pasien.poliRujukan.id}
   >
     ...
   </select>
   ```

   Nah jika kita tidak normalisasi dataJson berisi atau kita ganti menjadi `dataJson[key] = val`, maka dataJson akan menjadi:

   ```javascript
   {
     "poliRujukan.id": "value"
   }
   ```

   yang kita perlukan adalah seperti ini:

   ```javascript
   {
     poliRujukan: {
       id: "value";
     }
   }
   ```

## Implementasi Latihan

Appointment.js

```javascript
import { fetch } from "whatwg-fetch";

const cors = "https://cors-anywhere.herokuapp.com";
const apiUrl = "http://si-appointment.herokuapp.com/api";

const baseUrl = `${cors}/${apiUrl}`;

async function checkStatusAndTransform(p) {
  return Promise.resolve(p).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      const error = new Error(response.statusText);
      error.response = response.json();
      throw error;
    }
  });
}
```

### 1. Daftar Seluruh Staff Farmasi

Buat fungsi untuk fetching data dari endpoint /getAllStaffFarmasi.

```javascript
  async getAllStaffFarmasi() {
    return await checkStatusAndTransform(
      fetch(`${baseUrl}/1/getAllStaffFarmasi`)
    );
  }
```

Lalu, buat stateless component StaffFarmasiRow seperti DaftarPasienRow, isinya berbeda hanya memunculkan row nama.

```jsx
export const StaffFarmasiRow = props => {
  return (
    <tbody>
      {props.listStaffFarmasi.map(staff => {
        return (
          <tr key={staff.id}>
            <td>{staff.nama}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
```

Lalu buat screen baru DaftarStaffFarmasi sama seperti DaftarPasien. Buat fungsi componentDidMount

```javascript
  componentDidMount() {
    Appointment.getAllStaffFarmasi()
      .then(({ result }) => {
        this.setState({ listStaffFarmasi: result });
      })
      .finally(() => this.setState({ loading: false }));
  }
```

Lalu buat fungsi render

```jsx
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
```

### 2. Create Lab Result

Tambahkan method untuk call endpoint pada Appointment.js

```javascript
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
```

Sama seperti membuat update pasien, selanjutnya buat form berupa component stateless pada folder containers. Pada form baru ini tambahkan props listPasien.

```jsx
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
```

Lalu buat screen CreateLabResult sama seperti UpdatePasien hanya saja pada componentDidMount kita call endpoint untuk load list pasien.

```javascript
  componentDidMount() {
    Appointment.getAllPasien()
      .then(({ result }) => this.setState({ listPasien: result }))
      .catch(() => alert("Gagal melakukan load pasien"))
      .finally(() => this.setState({ loading: false }));
  }
```

lalu render form

```jsx
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
```

lalu buat handleSubmit yang memanggil addLabResult yang telah dibuat di Appointment sebelumnya.

```javascript
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
```
