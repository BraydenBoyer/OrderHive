/*
    Purpose of this file is to handle functions related to organizations in firestore
 */



import {collection, doc, setDoc, query, where, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {fireAuth, fireDb} from "../initializeFirebase.js";
import { v4 } from 'uuid';
import {addOrgToUser, getCurrentUserInfo} from "./userFunctions.js";
import {globalVariable} from "../../_layout.jsx";


/*
    Creates a new organization

    @author Miles
 */
export const createOrganization = async (name, location) => {

    // Creating Unique User ID
    const orgID = 'Org.' + name

    // Getting the current user (owner) info
    const currentUser = await getCurrentUserInfo()
    const orgOwner = { role: 'owner', ...currentUser}

    // Creating the path to the doc
    const orgRef = doc(fireDb, 'organizations', orgID)

    // Creating the organization document in firestore
    await setDoc(orgRef, {
        name: name,
        location: location,
    })

    // Adding the owner to the org
    await addCurrentUserToOrg(name, 'owner')

    // Add the org to the user
    await addOrgToUser(name, 'owner', location)

    console.log("Organization created: ", orgID)
}


/*
    Adds the current user to an organization.

    @author Miles
 */
export const addCurrentUserToOrg = async (orgName, role) => {

    // Getting the current user info
    const currentUser = await getCurrentUserInfo()
    const userInfo = {
        role: role,
        name: currentUser.name,
        userID: currentUser.userID,
        email: currentUser.email,
        phone: currentUser.phone
    }

    // Creating the path to the doc
    const orgCollabRef = doc(fireDb, `organizations/Org.${orgName}/collaborators`, userInfo.userID)

    // Creating the collaborator document in firestore
    await setDoc(orgCollabRef, userInfo)

    console.log(`Collaborator ${userInfo.name} added to: `, orgName )
}




/*
    Checks to see if an organization's name exists

    @author Miles
 */
export const checkOrgExists = async (name) => {

    // Path to collection
    const orgsRef = collection(fireDb, 'organizations')

    // Searching for org
    const queryFunc = query(orgsRef, where("name", "==", name))

    const querySnap = await getDocs(queryFunc)

    /* // Prints the docs found
    querySnap.forEach((doc) => {
        console.log("checkOrgExists query found:", doc.data());
    });
     */

    return !querySnap.empty
}


export const getOrg = async (orgName) => {

    const docRef = doc(fireDb, "organizations", 'Org.' + orgName);
    const docSnap = await getDoc(docRef);

    return docSnap.data()
}

//function just to get all organizations for inventory
export async function getAllOrganizations() {
    try {
        const organizationsRef = collection(fireDb, "organizations"); // Replace with your collection name
        const snapshot = await getDocs(organizationsRef);

        if (snapshot.empty) {
            console.log("No organizations found.");
            return [];
        }

        const organizationsArray = [];
        snapshot.forEach(doc => {
            organizationsArray.push({ id: doc.id, ...doc.data() });
        });

        console.log("Organizations fetched successfully:", organizationsArray);
        return organizationsArray;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw new Error("Failed to fetch organizations.");
    }
}

export const updateCompanyPhone = async (phone) => {

    const currOrg = "Org." + globalVariable.currentOrg;

    const companyRef = doc(fireDb, "organizations", currOrg)
    const update = {
        phone: phone
    }
    await updateDoc(companyRef,update)
}

export const updateCompanyName = async (name) => {

    const currOrg = "Org." + globalVariable.currentOrg;

    const companyRef = doc(fireDb, "organizations", currOrg)
    const update = {
        name: name
    }
    await updateDoc(companyRef,update)
}

export const updateCompanyAddress = async (address) => {

    const currOrg = "Org." + globalVariable.currentOrg;

    const companyRef = doc(fireDb, "organizations", currOrg)
    const update = {
        location: address
    }
    await updateDoc(companyRef,update)
}

export const updateCompanyEmail = async (email) => {

    const currOrg = "Org." + globalVariable.currentOrg;


    const companyRef = doc(fireDb, "organizations", currOrg)
    const update = {
        email: email
    }
    await updateDoc(companyRef,update)
}

export const changeUserRoleInOrg = async (uid, role) => {

    const currOrg = "Org." + globalVariable.currentOrg;
    const collaboratorRef = doc(
        fireDb,
        `organizations/${currOrg}/collaborators`,
        uid
    );

    try {
        await updateDoc(collaboratorRef, {
            role: role,
        });
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};