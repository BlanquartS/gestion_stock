import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import schedule from 'node-schedule';
import Auth from "./Components/Auth";
import Main from "./Main";

export default function App() {
  const [session, setSession] = useState(null);
  schedule.scheduleJob('0 7 * * *', async function () {
    await supabase.from("stockChampagne").select("*").order('id', {ascending: true})
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "10px 0px 100px 0" }}>
      {!session ? <Auth /> : <Main key={session.user.id} session={session} />}
    </div>
  );
}
