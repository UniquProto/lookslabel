// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyA2NqT0Shr_8yb-YQWWCh3b-1DnFUi4ZhI',
	authDomain: 'spring-internship.firebaseapp.com',
	databaseURL: 'https://spring-internship.firebaseio.com',
	projectId: 'spring-internship',
	storageBucket: 'spring-internship.appspot.com',
	messagingSenderId: '871532525324',
	appId: '1:871532525324:web:a6a8cd49b945e5788c3b29',
	measurementId: 'G-S2BPC07SW6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//------------------------------------------------------------------------------------------
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function (authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown: function () {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		},
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: 'index.html',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		// firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		// firebase.auth.PhoneAuthProvider.PROVIDER_ID,
	],
	// Terms of service url.
	tosUrl: 'index.html',
	// Privacy policy url.
	privacyPolicyUrl: '<your-privacy-policy-url>',
};
ui.start('#firebaseui-auth-container', uiConfig);
