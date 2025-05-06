import { Client,ID,Storage, Databases, Query } from "appwrite";
import Config from "../AppwriteConfig/Config";

export class DBservice{
    client = new Client;
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint("https://fra.cloud.appwrite.io/v1")
        .setProject("67dd104700078bb8e016");
        // .setEndpoint(Config.appwriteUrl)
        // .setProject(Config.appwriteProjectId);
        // if (!Config.appwrite_url || !Config.appwrite_projectID) {
        //     throw new Error("Missing Appwrite configuration");
        // }
      
         this.database = new Databases(this.client)
         this.bucket = new Storage(this.client)
    }

    async CreatePost({Title,Content,Status,UserID,FeaturedImage,slug}){ 
        try {
            return await this.database.createDocument(
                Config.appwrite_databaseID,
                Config.appwrite_collectionID,
                ID.unique(),
                // slug,
                {
                    Title,
                    Content,
                    Status,
                    FeaturedImage,
                    UserID,
                }
            )
        } 
        catch (error) {
            throw error;
        }

    }
    async UpdatePost(slug,{Title,FeaturedImage,Content,Status}){
        try {
            return await this.database.updateDocument(
                Config.appwrite_databaseID,
                Config.appwrite_collectionID,
                Config.appwrite_bucketID,
                slug,
                {
                    Title,
                    Content,
                    FeaturedImage,
                    Status,
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
                Config.appwrite_databaseID,
                Config.appwrite_collectionID,
                Config.appwrite_bucketID,
                // slug,
                ID.unique(),
            )
            return true;
        } 
        catch (error) {
            
        }
    }
    async getPost(){
        try {
            return await this.database.getDocument(
                Config.appwrite_databaseID,
                Config.appwrite_collectionID,
                ID.unique(),
            )
        } 
        catch (error) {
            throw error;
        }
    }
    async listofPost(){
        try {
            return await this.database.listDocuments(
                Config.appwrite_databaseID,
                Config.appwrite_collectionID,
                // slug,
                ID.unique(),
                [
                    Query.equal("Status","active")
                ]
            )
        } 
        catch (error) {
            
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                Config.appwrite_bucketID,
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
                Config.appwrite_bucketID,
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
        Config.appwrite_bucketID,
         fileId
      )
    }
}

const dbservice = new DBservice();
export default dbservice;