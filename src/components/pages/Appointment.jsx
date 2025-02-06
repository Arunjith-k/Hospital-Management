import "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/Appcontext";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return <div>Appointment</div>;
};

export default Appointment;
