import { Client, ID, Account } from "appwrite";
import configuration from "../AppwriteConfig/Config"

class Authservice {
    Client = new Client();
    account;

    constructor() {
        this.Client
        // .setEndpoint("https://fra.cloud.appwrite.io/v1")
        // .setProject("67dd104700078bb8e016");
       
        .setEndpoint(configuration.appwriteUrl)
        .setProject(configuration.appwriteProjectId);

        // if (!configuration.appwrite_url || !configuration.appwrite_projectID) {
        //     throw new Error("Missing Appwrite configuration");
        // }
      

        this.account = new Account(this.Client);
    }

    async createAccount({ name, email, password }) {
        console.log(email);
        try {
            return await this.account.create(ID.unique(), email, password, name);
            //  const useraccount = await this.account.create(ID.unique(), email, password, name);
            // console.log("account created");
            // if (useraccount) {
            //     // call another method
            //     return this.login({email, password});
            // } else {
            //    return  useraccount;
            // }
        }
        catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const userlogin = await this.account.createEmailPasswordSession(email, password);
            return userlogin;
        }
        catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
             return await this.account.get()
            // console.log(result);
        }
        catch (error) {
            throw error;
        }
        return null;
    }
    async logout(){
        try{
          return await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }
}

const authservice = new Authservice();
export default authservice;