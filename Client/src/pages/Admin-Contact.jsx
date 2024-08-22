import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
// Import statement assumed to be correct for deleteContactsById

export const AdminContact = () => {
    const { authorizationToken } = useAuth();
    const [contactData, setContactData] = useState([]);

    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5002/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log("contact data:", data);
            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
// delete the contacts by the Id
    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });
            if (response.ok) {
                // Remove the deleted contact from the state
                setContactData(prevData => prevData.filter(contact => contact._id !== id));
                toast.success("delete conacts successfull")
            }else{
                toast.error("not delete contact")
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContactsData();
    }, []);

    return (
        <>
            <section className="admn-user">
                {contactData.map((curContactData, index) => {
                    const { username, email, message, _id } = curContactData;
                    return (
                        <div key={index}>
                            <p>{username}</p>
                            <p>{email}</p>
                            <p>{message}</p>
                            <button className="btn" onClick={() => deleteContactById(_id)}>delete</button>
                        </div>
                    );
                })}
            </section>
        </>
    );
};
