import rp from 'request-promise'
import queryString from 'query-string'

class Auth {

    getProfile() {

        var options = {
            method: 'POST',
            uri: "http://192.168.245.153:8081/oauth/check_token",
            qs: {
                token: sessionStorage.getItem('access_token')
            },
            headers: {
                'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
            },
            json: true
        };

        rp(options)
            .then(function (parsedBody) {
                return parsedBody
            })
            .catch(function (err) {
                return err
            });

    }

    getIdToken() {
        return sessionStorage.getItem('access_token')
    }

    iisAuthenticated() {

        var options = {
            method: 'POST',
            uri: "http://192.168.245.153:8081/oauth/check_token",
            qs: {
                token: sessionStorage.getItem('access_token')
            },
            headers: {
                'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
            },
            json: true
        };

        rp(options)
            .then(function () {
                return true
            })
            .catch(function (err) {
                return false
            });

    }

    isAuthenticated() {

        console.log(sessionStorage.getItem('expires'))

        if(sessionStorage.getItem('expires') !== null || new Date().getTime() < Number(sessionStorage.getItem('expires')))
            return true;
        else
            return false;

    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            const parsed = queryString.parse(window.location.hash.substring(1));
            if (parsed['access_token']) {
                sessionStorage.setItem('access_token', parsed['access_token'])
                sessionStorage.setItem('token_type', parsed['token_type'])
                sessionStorage.setItem('expires', Date.now() + parsed['expires_in'] * 1000)
            }
            resolve();
        })
    }

    signIn() {

        const auth = {
            domain: 'http://192.168.245.153:8081/oauth/',
            clientID: 'my-trusted-client',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token',
            scope: 'read write'
        }

        let scopes = ["read", "write"];

        let authorize_url = auth.domain + "authorize?response_type=" + auth.responseType + "&redirect_uri=" + auth.redirectUri + "&client_id=" + auth.clientID + "&scope=" + scopes.join("%20");
        document.location.href = authorize_url;

    }

    signOut() {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('token_type');
        sessionStorage.removeItem('expires');
    }
}

const authClient = new Auth();

export default authClient;
