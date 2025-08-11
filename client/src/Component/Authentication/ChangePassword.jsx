import { useEffect, useRef, useState } from "react";
import logo from "../../../public/blacklogoamazon.png";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [udata, setUdata] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setUdata("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.addEventListener("mousedown", handleClick);
  }, []);
  const token = localStorage.getItem("authtoken");
  const isTokenExpire = (token) => {
    if (!token) return true;
  };
  const sendData = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = udata;
    try {
      if (oldPassword === "" || newPassword === "") {
        alert("Please provide details");
      } else {
        const res = await fetch("http://localhost:5500/change-password", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        });

        const data = await res.json();
        if (data) {
          console.log(res.data);
        }
        if (!res.ok) {
          console.log("Invalid details", data.error);
          alert("Invalid Details");
        } else {
          alert("Password change successful");
          setUdata({ ...udata, oldPassword: "", newPassword: "" });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error + "change password unsuccessful");
    }
  };
  useEffect(() => {
    if (isTokenExpire(token)) {
      localStorage.removeItem("authtoken");
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <section>
      <div>
        <div>
          <img src={logo} alt="" className="w-[200px] m-auto" />
        </div>

        <form method="POST" className="pb-12" ref={ref}>
          <div className="sm:w-[500px] m-auto border space-y-6 py-8 px-4 rounded-md">
            <h2 className="text-2xl">Change Password</h2>

            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                onChange={(e) =>
                  setUdata({ ...udata, oldPassword: e.target.value })
                }
                value={udata.oldPassword}
                className="border rounded-lg p-2 "
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                onChange={(e) =>
                  setUdata({ ...udata, newPassword: e.target.value })
                }
                value={udata.newPassword}
                className="border rounded-lg p-2"
              />
            </div>

            <div>
              <button
                className="bg-[#F1C76A] rounded-md w-full p-2"
                onClick={sendData}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
