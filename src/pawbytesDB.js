
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import { ObjectID } from "mongodb";

const client = Stitch.initializeDefaultAppClient("pawbytesrealm-vysuh");
const mongodb = client.getServiceClient ( RemoteMongoClient.factory, "mongodb-atlas");
const db = mongodb.db('PawBytes');
client.auth.loginWithCredential(new AnonymousCredential());

export async function get_etreats_from_db()
{
    let etreats = null;
    try {
        etreats = await db.collection("etreats").find().toArray();
        etreats = etreats.map((treat)=> {
            treat._id = treat._id.toString();
            return treat; 
        });
        
    }
    catch (error) {
        console.error(error);
    }
    finally {
        return etreats;
    }
}; 

export async function get_pawpals_from_db()
{
    let pawpals = null;
    try {
        pawpals = await db.collection("pawpals").find().toArray();
        pawpals = pawpals.map((pawpal)=> {
            pawpal._id = pawpal._id.toString();
            return pawpal; 
        });
    }
    catch {
        console.log("Unable to retrieve data")
    }
    finally {
        return pawpals;
    }
}; 


export async function get_products_from_db()
{
    let products = null;
    try {
        products = await db.collection("products").find().toArray();
    }
    catch {
        console.log("Unable to retrieve data")
    }
    finally {
        return products;
    }
}; 


export async function get_credits_from_db()
{
    let credits = null;
    try {
        credits =   await db.collection("credits").find().toArray();
    }
    catch {
        console.log("Unable to retrieve data")
    }
    finally {
        return credits;
    }
}; 


export async function get_album_from_db()
{
    let album = null;
    try {
        album =   await db.collection("album").find().toArray();
    }
    catch {
        console.log("Unable to retrieve data")
    }
    finally {
        return album;
    }
}; 


export async function get_customer_from_db(customerid)
{
    let customer = null;
    try {
        customer =   await db.collection("customers").findOne({"_id": ObjectID(customerid)});
    }
    catch {
        console.log("Unable to retrieve customer", customerid)
    }
    finally {
        return customer;
    }
}

export async function set_customer_into_db(customer)
{
    let customerid = null;
    try {
        await db.collection("customers").insertOne(customer)
        .then((result)=> {customerid = result.insertedId.toString()});
    }
    catch {
        console.log("Unable to add customer", customer);
    }
    finally
    {
        return customerid;
    }
};

export async function add_order_into_db(order)
{
    try {
        await db.collection("orders").insertOne(order)
    }
    catch (error) {
        console.log(error);
    }
}