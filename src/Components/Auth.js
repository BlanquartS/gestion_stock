import { signInWithGoogle } from "../supabaseClient";

export default function Auth() {
  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Sign in with Google</h1>
        <button
          className="button block"
          aria-live="polite"
          onClick={signInWithGoogle}
        >
          Google
        </button>
      </div>
    </div>
  );
}
