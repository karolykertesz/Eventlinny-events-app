const dotenv = require("dotenv").config();
import * as functions from "firebase-functions";
import admin from "firebase-admin";

export const onZoom = functions.firestore.document("/").onCreate();
