import {API_BASE_URL} from '../../../constants'
import rp from 'request-promise'


export const getSkills = () => dispatch => {

    var characterId = sessionStorage.getItem('CharacterID')

    var options = {
        method: 'GET',
        uri: API_BASE_URL + "characters/"+characterId+"/skills/",
        qs: {
            datasource: 'tranquility',
            token: sessionStorage.getItem('access_token')
        },
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            dispatch({ type: 'SKILL_IMPORT', payload: parsedBody })
        })
        .catch(function (err) {

        });

}