import React, { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { AuthApi } from "../../Api/AuthApi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { GlobalContext } from "../../Context/ContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";

const Authentication = () => {
  const [toggle, setToggle] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [user, loading] = useAuthState(auth);

  const { create } = useContext(GlobalContext);
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // if (user) {
  //   navigate(from, { replace: true });
  // }
  // main state
  const [role, setRole] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthentication = (e) => {
    e.preventDefault();
    if (role === "user") {
      if (displayName && email && password) {
        handleCreateAccount(role, displayName, email, password, create);
      } else if (email && password) {
        handleSignIn(role, email, password);
      }
    } else if (role === "trainer") {
      if (displayName && email && password) {
        handleCreateAccount(role, displayName, email, password, create);
      } else if (email && password) {
        handleSignIn(role, email, password);
      }
    } else if (role === "admin") {
      if (email && password) {
        handleSignIn(role, email, password);
      }
    }
  };

  // create account
  const handleCreateAccount = (role, displayName, email, password, create) => {
    setSpinner(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { uid } = result.user;
        updateProfile(auth.currentUser, {
          displayName: displayName,
        }).then(() => {
          setSpinner(false);
          const authInfo = {
            uid,
            role,
            displayName,
            email,
            create,
          };
          AuthApi(authInfo);
          if (role === "user") {
            navigate("/user-dashboard");
          } else if (role === "trainer") {
            navigate("/trainer-dashboard");
          } else if (role === "admin") {
            navigate("/admin-dashboard/list");
          }
        });
      })
      .catch((error) => {
        setSpinner(false);
        setErrMsg(error.code);
      });
  };

  // login account
  const handleSignIn = (role, email, password) => {
    setSpinner(true);
    onSnapshot(
      query(
        collection(db, "authCollection"),
        where("role", "==", role),
        where("email", "==", email)
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
              setSpinner(false);
              if (result) {
                if (role === "user") {
                  navigate("/user-dashboard/profile");
                } else if (role === "trainer") {
                  navigate("/trainer-dashboard");
                } else if (role === "admin") {
                  navigate("/admin-dashboard/list");
                }
              }
            })
            .catch((error) => {
              setSpinner(false);
              setErrMsg(error.code);
            });
        } else {
          setSpinner(false);
          setErrMsg("You are logging in to the wrong place");
        }
      }
    );
  };

  // reset password
  const handleResetPasasword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your mail");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="bg-raisinBlack cc min-h-screen grid place-items-center">
      <div className="w-11/12 md:w-2/4 lg:w-1/3 p-8 shadow-2xl rounded bg-raisinBlack text-white">
        <p className="text-center mb-5">
          <Link to="/" className="text-2xl lg:text-3xl font-bold font-lobster ">
            Fitness <span className="text-orange">Club</span>
          </Link>
        </p>

        <form onSubmit={handleAuthentication}>
          <fieldset className="flex justify-evenly items-center p-5">
            <label className="cursor-pointer">
              <input
                onClick={(e) => {
                  setRole("user");
                  setToggle(true);
                  setIsAdmin(false);
                }}
                type="radio"
                name="role"
                required
              />
              <span className="ml-1">USER</span>
            </label>
            <label className="cursor-pointer">
              <input
                onClick={(e) => {
                  setRole("trainer");
                  setToggle(false);
                  setIsAdmin(true);
                }}
                type="radio"
                name="role"
                required
              />
              <span className="ml-1">TRAINER</span>
            </label>
            <label className="cursor-pointer">
              <input
                onClick={(e) => {
                  setRole("admin");
                  setIsAdmin(true);
                  setToggle(false);
                }}
                type="radio"
                name="role"
                required
              />
              <span className="ml-1">ADMIN</span>
            </label>
          </fieldset>
          {!isAdmin && (
            <>
              {toggle && (
                <input
                  pattern="[a-z A-Z]{0,}"
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
                  placeholder="Name"
                  required
                />
              )}
            </>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            pattern="[\S+@\S+\.\S+]{0,}"
            type="email"
            className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            pattern="[a-zA-Z0-9]{6,}"
            type="password"
            className="w-full p-2 border focus:border-orange outline-none rounded text-raisinBlack"
            placeholder="Password"
            required
          />
          {!toggle && (
            <small className="text-xs text-orange underline cursor-pointer">
              <label htmlFor="my-modal-3">Forget Password</label>
            </small>
          )}
          <button className="bg-orange hover:bg-deepOrange text-white w-full p-2 mt-3 border-0 outline-none rounded">
            {toggle ? (
              <p className="flex justify-center items-center">
                {spinner ? (
                  <Oval
                    height={25}
                    width={25}
                    color="#ffffff"
                    secondaryColor="#e6e6e6"
                    strokeWidth={5}
                  />
                ) : (
                  "Register"
                )}
              </p>
            ) : (
              <p className="flex justify-center items-center">
                {spinner ? (
                  <Oval
                    height={25}
                    width={25}
                    color="#ffffff"
                    secondaryColor="#e6e6e6"
                    strokeWidth={5}
                  />
                ) : (
                  "Login"
                )}
              </p>
            )}
          </button>

          {errMsg && <p className="text-rose-600 text-center my-3">{errMsg}</p>}
          {!isAdmin && (
            <p className="text-center my-5">
              {toggle ? "Already have an account?" : "Don't have any account?"}
              <span
                onClick={() => setToggle(!toggle)}
                className="text-orange ml-2 cursor-pointer hover:underline"
              >
                {toggle ? "Login" : "Register"}
              </span>
            </p>
          )}
        </form>
      </div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label htmlFor="my-modal-3" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-center text-orange mb-3 text-lg font-bold">
            Forgot password
          </h3>
          <form onSubmit={handleResetPasasword}>
            <input
              name="email"
              pattern="[\S+@\S+\.\S+]{0,}"
              type="email"
              className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
              placeholder="Email"
              required
            />
            <button className="bg-orange hover:bg-deepOrange text-white w-full p-2 mt-3 border-0 outline-none rounded">
              Reset
            </button>
          </form>
        </label>
      </label>
    </div>
  );
};

export default Authentication;
