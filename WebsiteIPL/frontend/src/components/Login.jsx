import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSliceWarga";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.authwarga
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/pembayaran/warga");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div className="box">
                <form onSubmit={Auth}>
                  {isError && (
                    <p className="has-text-centered has-text-danger">
                      {message}
                    </p>
                  )}
                  <h3 className="title is-4 has-text-centered">Aplikasi IPL</h3>
                  <h3 className="title is-6 has-text-centered">Warga</h3>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-info is-fullwidth"
                    >
                      {isLoading ? "Menunggu..." : "Masuk"}
                    </button>
                  </div>
                  <div className="field mt-5">
                    <div className="controls">
                      <hr />
                      <h3 className="has-text-centered">Pengurus Warga ?</h3>
                    </div>
                  </div>
                </form>
                <div className="field mt-5">
                  <Link to="/admins" className="button is-success is-fullwidth">
                    Login disini
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
