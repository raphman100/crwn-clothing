import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyBelRKrbw0HOIy-i-1qc7H4uSx9GCKV15Q",
	authDomain: "rmr-crwn-clothing.firebaseapp.com",
	databaseURL: "https://rmr-crwn-clothing.firebaseio.com",
	projectId: "rmr-crwn-clothing",
	storageBucket: "rmr-crwn-clothing.appspot.com",
	messagingSenderId: "1048073305747",
	appId: "1:1048073305747:web:0737e4c065bdd0b0099766",
	measurementId: "G-R8T4XXE2JW"
};

export const createUserProfileDocument = async ( userAuth, additionalData ) => {
	if ( !userAuth ) return;

	const userRef = firestore.doc( `users/${ userAuth.uid }` );
	const snapShot = await userRef.get();

	if ( !snapShot.exists ) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set( {
				displayName,
				email,
				createdAt,
				...additionalData,
			} )
		} catch ( error ) {
			console.error( 'Error creating user: ', error.message );
		}
	}

	return userRef;
};

firebase.initializeApp( config );

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' } );
export const signInWithGoogle = () => auth.signInWithPopup( provider );

export default firebase;
