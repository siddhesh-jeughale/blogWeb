import { Client,ID,Storage, Databases, Query } from "appwrite";
import Config from "../AppwriteConfig/Config";

export class DBservice{
    client = new Client;
    database;
    bucket;

    constructor(){
        this.client
        // .setEndpoint("https://fra.cloud.appwrite.io/v1")
        // .setProject("67dd104700078bb8e016");
        .setEndpoint(Config.appwriteUrl)
        .setProject(Config.appwriteProjectId);
        // if (!Config.appwrite_url || !Config.appwrite_projectID) {
        //     throw new Error("Missing Appwrite configuration");
        // }
      
         this.database = new Databases(this.client)
         this.bucket = new Storage(this.client)
    }

    async CreatePost({title,content,status,userId,featuredImage,slug}){ 
        try {
            return await this.database.createDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                ID.unique(),
                // slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId,
                }
            )
        } 
        catch (error) {
            throw error;
        }

    }
    async UpdatePost(slug,{title,featuredImage,content,status}){
        try {
            return await this.database.updateDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                Config.appwriteBucketId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } 
        catch (error) {
         throw error;   
        }
    }
    async deletePost(){
        try {
            await this.database.deleteDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                Config.appwriteBucketId,
                // slug,
                ID.unique(),
            )
            return true;
        } 
        catch (error) {
            console.log(error)
        }
    }
    async getPost(slug){
        try {
            return await this.database.getDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug,
                // ID.unique(),
            )
        } 
        catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }
    async listofPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                queries,
            )
        } 
        catch (error) {
            console.log(error)
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                Config.appwriteBucketId,
                ID.unique(),
                file,
            
            )
        }
        catch(error){
            throw error;
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                Config.appwriteBucketId,
                fileId
                // whate is mean file parameter
            )
            return true;
        } catch (error) {
            throw error;
        }
    }
     getFilePreview(fileId){
      return this.bucket.getFilePreview(
        Config.appwriteBucketId,
         fileId
      )
    }
}

const dbservice = new DBservice();
export default dbservice;