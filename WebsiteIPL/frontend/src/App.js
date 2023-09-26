import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import LoginAdmins from "./components/LoginAdmins";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import Iurans from "./pages/Iurans";
import AddIuran from "./pages/AddIuran";
import EditIuran from "./pages/EditIuran";
import KonfPembayaran from "./pages/KonfPembayaran";
import Laporan from "./pages/Laporan";
import AddKeuangan from "./pages/AddKeuangan";
import EditKeuangan from "./pages/EditKeuangan";
import EditHasilKeuangan from "./pages/EditHasilKeuangan";
import PembayaranWarga from "./pages/PembayaranWarga";
import EditPasswordWarga from "./pages/EditPasswordWarga";
import KeuanganWarga from "./pages/KeuanganWarga";
import AddBuktiBayar from "./pages/AddBuktiBayar";
import EditBuktiBayar from "./pages/EditBuktiBayar";
import KelolaKeuangan from "./pages/KelolaKeuangan";
import Admins from "./pages/Admins";
import AddAdmin from "./pages/AddAdmins";
import EditAdmin from "./pages/EditAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admins" element={<LoginAdmins />} />
          <Route path="/pengurus" element={<Admins />} />
          <Route path="/pengurus/add" element={<AddAdmin />} />
          <Route path="/pengurus/edit/:id" element={<EditAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/members/edit/:id" element={<EditMember />} />
          <Route path="/iurans" element={<Iurans />} />
          <Route path="/iurans/add" element={<AddIuran />} />
          <Route path="/iurans/edit/:id" element={<EditIuran />} />
          <Route path="/pembayaran" element={<KonfPembayaran />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/keuangans/add" element={<AddKeuangan />} />
          <Route path="/keuangans/edit/:id" element={<EditKeuangan />} />
          <Route path="/pembayaran/warga" element={<PembayaranWarga />} />
          <Route path="/password" element={<EditPasswordWarga />} />
          <Route path="/keuangan/warga" element={<KeuanganWarga />} />
          <Route path="/upload/:id" element={<AddBuktiBayar />} />
          <Route path="/update/bukti/:id" element={<EditBuktiBayar />} />
          <Route
            path="/keuangans/preview/edit/:id"
            element={<EditHasilKeuangan />}
          />
          <Route path="/kelola" element={<KelolaKeuangan />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
