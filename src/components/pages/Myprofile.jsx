import "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
const Myprofile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjames@gmail.com",
    phone: "555-980-232",
    address: {
      line1: "123 Main St",
      line2: "Anytown, USA",
    },
    gender: "Male",
    dob: "1990-01-01",
  });

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div>
      <img src={userData.image} alt="" />

      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p>{userData.name}</p>
      )}

      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>EMAIl ID:</p>
          <p>{userData.email}</p>
          <p>Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
