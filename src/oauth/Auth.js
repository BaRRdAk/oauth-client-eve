import rp from 'request-promise'
import queryString from 'query-string'
import API_BASE_URL from '../constants'
import CALLBACK_URL from '../constants'
import AUTHORIZATION_URL from '../constants'
import TOKEN_URL from '../constants'
import CLIENT_ID from '../constants'
import CLIENT_SECRET from '../constants'

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

    isAuthenticated() {

        console.log(sessionStorage.getItem('expires_in'))

        if(sessionStorage.getItem('expires_in') !== null || new Date().getTime() < Number(sessionStorage.getItem('expires_in')))
            return true;
        else
            return false;

    }

    handleAuthorizationCode() {
        return new Promise((resolve, reject) => {
            const parsed = queryString.parse(window.location.hash.substring(1));
            if (parsed['code']) {
                var options = {
                    method: 'POST',
                    uri: TOKEN_URL,
                    qs: {
                        grant_type: 'authorization_code',
                        code: parsed['code']
                    },
                    headers: {
                        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                        'Content-Type': 'application/json',
                        'Host': 'login.eveonline.com'
                    },
                    json: true
                };
        
                rp(options)
                    .then(function (parsedBody) {
                        if (parsedBody['access_token']) {
                            sessionStorage.setItem('access_token', parsedBody['access_token'])
                            sessionStorage.setItem('refresh_token', parsedBody['access_token'])
                            sessionStorage.setItem('token_type', parsedBody['token_type'])
                            sessionStorage.setItem('expires_in', Date.now() + parsedBody['expires_in'] * 1000)
                        }
                        resolve();
                    })
                    .catch(function (err) {
                        reject();
                    });
            }       
        })
    }

    signIn() {

        const scopes = [
            "esi-wallet.read_character_wallet.v1", 
            "esi-assets.read_assets.v1", 
            "esi-industry.read_character_jobs.v1", 
            "esi-characters.read_blueprints.v1", 
            "esi-markets.read_character_orders.v1", 
            "esi-planets.manage_planets.v1"
        ]

        let authorize_url = AUTHORIZATION_URL + "?response_type=code&redirect_uri=" + CALLBACK_URL + "&client_id=" + CLIENT_ID + "&scope=" + scopes.join("%20");
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
