import "./styles.css";

import Header from "../components/Header";

import Index from "../routes";
import { UserProvider } from "../contexts/UserContexts";
import ToastNotification from "../components/ToastNotification";

export default function Main() {
  return (
    <main>
      <UserProvider>
        <ToastNotification />
        <div>
          <Header />
          <section className="contentPage">
            <Index />
          </section>
        </div>
      </UserProvider>
    </main>
  );
}
