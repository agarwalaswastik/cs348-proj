import { Link, Redirect, Route, Switch } from "wouter";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PatientsPage from "./pages/PatientsPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header>
        <nav className="p-4 flex gap-4">
          <Link href="/doctors">Doctors</Link>
          <Link href="/patients">Patients</Link>
          <Link href="/appointments">Appointments</Link>
          <Link href="/reports">Reports</Link>
        </nav>
      </header>
      <main className="w-screen flex-1">
        <Switch>
          <Route path="/" component={() => <Redirect to="/appointments" />} />
          <Route path="/doctors" component={DoctorsPage} />
          <Route path="/patients" component={PatientsPage} />
          <Route path="/appointments" component={AppointmentsPage} />
          <Route path="/reports" component={ReportsPage} />
        </Switch>
      </main>
    </div>
  );
}
