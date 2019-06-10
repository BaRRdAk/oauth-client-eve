import rp from 'request-promise'
import queryString from 'query-string'
import {CALLBACK_URL, AUTHORIZATION_URL, VERIFY_URL, TOKEN_URL, CLIENT_ID, CLIENT_SECRET, REVOKE_TOKEN_URL} from '../constants'

class Auth {

    refreshToken() {

        var options = {
            method: 'POST',
            uri: TOKEN_URL,
            qs: {
                grant_type: 'refresh_token',
                refresh_token: sessionStorage.getItem('refresh_token')
            },
            headers: {
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'login.eveonline.com'
            },
            json: true
        };

        rp(options)
            .then(function (parsedBody) {
                sessionStorage.setItem('access_token', parsedBody['access_token'])
                sessionStorage.setItem('refresh_token', parsedBody['refresh_token'])
                sessionStorage.setItem('token_type', parsedBody['token_type'])
                sessionStorage.setItem('expires_in', Date.now() + parsedBody['expires_in'] * 1000)
            })
            .catch(function (err) {
                return err
            });

    }

    getIdToken() {
        return sessionStorage.getItem('access_token')
    }

    isAuthenticated() {

        console.log(Date.now(), sessionStorage.getItem('expires_in'))

        if(sessionStorage.getItem('expires_in') !== null && new Date().getTime() < Number(sessionStorage.getItem('expires_in'))){
            return true;
        } else if(sessionStorage.getItem('expires_in') !== null && new Date().getTime() > Number(sessionStorage.getItem('expires_in'))){
            sessionStorage.clear();
            document.location.href = '/';
        } else {
            return false;
        }
            
    }

    handleAuthorizationCode() {
        return new Promise((resolve, reject) => {
            const parsed = queryString.parse(window.location.hash.substring(1));
            if (parsed['access_token']) {
                console.log(parsed)
                sessionStorage.setItem('access_token', parsed['access_token'])
                sessionStorage.setItem('token_type', parsed['token_type'])
                sessionStorage.setItem('expires_in', Date.now() + parsed['expires_in'] * 1000)

                var options = {
                    method: 'GET',
                    uri: VERIFY_URL,
                    qs: {
                        datasource: 'tranquility',
                        token: parsed['access_token']
                    },
                    json: true
                };
        
                rp(options)
                    .then(function (parsedBody) {
                        sessionStorage.setItem('CharacterID', parsedBody['CharacterID'])
                        sessionStorage.setItem('CharacterName', parsedBody['CharacterName'])
                        resolve()
                    })
                    .catch(function (err) {
                        reject()
                    })
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
            "esi-planets.manage_planets.v1",
            "esi-skills.read_skills.v1"
        ]

        let authorize_url = AUTHORIZATION_URL + "?response_type=token&redirect_uri=" + CALLBACK_URL + "&client_id=" + CLIENT_ID + "&scope=" + scopes.join("%20");
        document.location.href = authorize_url;

    }

    signOut() {

        var options = {
            method: 'POST',
            uri: REVOKE_TOKEN_URL,
            qs: {
                token: sessionStorage.getItem('access_token')
            },
            headers: {
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'login.eveonline.com'
            },
        };

        rp(options)
            .then(function () {
                sessionStorage.clear();
                document.location.href = '/';
            })
            .catch(function (err) {
                return err
            });

    }

}

const authClient = new Auth();

export default authClient;
