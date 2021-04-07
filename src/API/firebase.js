import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAVjAmaKMMOfAQittaIIHbddz55fGMayHk",
	authDomain: "it-book-f23b6.firebaseapp.com",
	projectId: "it-book-f23b6",
	storageBucket: "it-book-f23b6.appspot.com",
	messagingSenderId: "751619613621",
	appId: "1:751619613621:web:019c6296762816a3852ffc",
	measurementId: "G-5GZ3K0WQKL",
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.firestore = app.firestore();
		this.types = app.firestore;
		this.functions = app.functions();
		this.storage = app.storage();
	}

	getAllEmpresas = async () => {
		const empresas = await this.firestore.collection("Empresas").get();
		return empresas.docs;
	};

	addEmpresa = async (empresa) => {
		await this.firestore.collection("Empresas").add(empresa);
	};
}

export default Firebase;